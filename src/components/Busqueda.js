import React from 'react';
import { connect } from 'react-redux';
import unsplash from '../apis/unsplash';
import wordsapi from '../apis/datamuse';
import RowTable from './ImageConsulta/RowTable';
import ImagePrev from './ImageConsulta/ImagePrev';
import { Link } from 'react-router-dom';
import { Buscar, selectRow } from '../actions';
import { Icon, Menu, Segment, Sidebar, Table, } from 'semantic-ui-react'

class Busqueda extends React.Component {

  state = { images: [], indicemin: 0, indicemax: 10, sel: 0, sinonimos: [] };

  componentDidUpdate() {
    if (this.props.busqueda && this.props.busqueda.buscar) {
      this.onSearchSynonyms();
      this.onSearchSubmit();
    }
  }

  onSearchSynonyms = async () => {
    const response = await wordsapi.get(`/words?ml=${this.props.busqueda.concepto}`);
    let syn = [];
    response.data.map((obj, ind) => { if (ind < 5) syn.push(obj.word) });
    this.setState({ sinonimos: syn })
  }


  onSearchSubmit = async () => {
    const response = await unsplash.get('/search/photos', {
      params: {
        query: this.props.busqueda.concepto,
        per_page: 24
      }
    });
    this.setState({ images: response.data.results })
    if (Object.keys(response.data.results).length > 0)
      this.props.Buscar({ ...this.props.busqueda, buscar: false });
  }

  adelante = () => {
    if (this.state.indicemax < this.state.images.length) {
      this.setState({ indicemin: this.state.indicemin + 10, indicemax: this.state.indicemax + 10 })
      this.props.selectRow({ ...this.props.row, indice: 0 });
    }
  }

  atras = () => {
    if (this.state.indicemin > 0) {
      this.setState({ indicemin: this.state.indicemin - 10, indicemax: this.state.indicemax - 10 });
      this.props.selectRow({ ...this.props.row, indice: 0 });
    }
  }
  render() {

    let table = [];
    let indiceImages = 0;
    let paginacion = [];
    let limite = (this.state.images.length / 10) - Math.round(this.state.images.length / 10) > 0 ? Math.round(this.state.images.length / 10) + 1 : Math.round(this.state.images.length / 10);
    let encabezado = null;

    this.state.images.forEach(element => {
      indiceImages++;
      if (indiceImages > this.state.indicemin && indiceImages <= this.state.indicemax) {
        table.push(<RowTable element={element} indice={indiceImages} />);
      }
    });


    for (let i = 1; i <= limite; i++) {
      let color = null;
      if (this.state.indicemax === i * 10)
        color = 'linear-gradient(to top, rgb(98, 125, 200) 2%, rgba(243, 234, 221, 0) 15%)';

      paginacion.push(<Menu.Item as='a' style={{ background: color }} onClick={() => { this.props.selectRow({ ...this.props.row, indice: 0 }); this.setState({ indicemin: i * 10 - 10, indicemax: i * 10 }) }}>{i}</Menu.Item>);
    }

    if (this.props.busqueda && this.props.busqueda.concepto && this.state.sinonimos.length > 0) {
      encabezado = <div>
        <h3>Palabras Relacionadas:  {this.state.sinonimos.map(t => <span style={{ color: '#3131b8' }}>{t}</span>).reduce((prev, curr) => [prev, ', ', curr])} </h3>
        <h5>Imagenes encontradas {this.state.images.length}</h5>
      </div>
    }

    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            style={{ background: '#778ecf' }}
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            vertical
            visible={this.props.menu}
            width='thin'
          >
            <Link to="/busqueda/." className="item" >
              <Icon name='search plus' />
              Consultar
            </Link>
            <Link to="/contacto" className="item" >
              <Icon name='call' />
              Contactar usuario
            </Link>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <form className="ui form" >
                <div class="two fields">
                  <div class="eleven wide field">
                    {encabezado}
                    <Table celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Descripción</Table.HeaderCell>
                          <Table.HeaderCell>Height</Table.HeaderCell>
                          <Table.HeaderCell>width</Table.HeaderCell>
                          <Table.HeaderCell>Usuario</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {table}
                      </Table.Body>
                      <Table.Footer>
                        <Table.Row>
                          <Table.HeaderCell colSpan='4'>
                            <Menu floated='right' pagination>
                              <Menu.Item as='a' onClick={this.atras} icon>
                                <Icon name='chevron left' />
                              </Menu.Item>
                              {paginacion}
                              <Menu.Item as='a' onClick={this.adelante} icon>
                                <Icon name='chevron right' />
                              </Menu.Item>
                            </Menu>
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Footer>
                    </Table>
                </div>
                <div class="five wide field">
                  <h3 style={{ 'text-align': 'center' }}>Previsualiza tu imagen </h3>
                  <ImagePrev />
                </div>
                </div>
              </form>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div >
    );
  };
}

const mapStateToProps = (state) => {
  return {
    menu: state.consulta.menu,
    busqueda: state.consulta.busqueda,
    row: state.consulta.row,
  };
};

export default connect(mapStateToProps, { Buscar, selectRow })(Busqueda);
