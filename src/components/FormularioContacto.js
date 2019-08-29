import React from 'react';
import {Form, Message, Icon, Menu, Segment, Sidebar, } from 'semantic-ui-react';
import { connect } from 'react-redux';
import history from '../history';
import { nameForm } from '../actions';
import { Link } from 'react-router-dom';

const opciones = [
    { key: 'C', text: 'Consulta', value: 'Consulta' },
    { key: 'CC', text: 'Crear campaña', value: 'Campaña' },
    { key: 'D', text: 'Denunciar fallo', value: 'Denunciar' },
];

class ContactoForm extends React.Component {

    state = {
        name: null, detalle: null, email: null, asunto: null,
        errorName: null, errorEmail: null, errorAsunto: null,
        formError: false,
    }

    enviar = (e) => {
        e.preventDefault();
        let error = false;
        if (!this.state.name) {
            this.setState({ errorName: true });
            error = true;
        }
        else {
            this.setState({ errorName: false });
        }
        if (!this.state.email) {
            this.setState({ errorEmail: true });
            error = true;
        }
        else {
            this.setState({ errorEmail: false });
        }
        if (!this.state.asunto) {
            this.setState({ errorAsunto: true });
            error = true;
        }
        else {
            this.setState({ errorAsunto: false });
        }

        this.setState({ formError: error });
        if (!error) {
            this.props.nameForm(this.state.name)
            history.push('/enviarconsulta');
        }
    }

    render() {
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
                            <div style={{ paddingLeft: '30%' }}>
                                <Form error={this.state.formError} style={{ width: '50%' }}>
                                    <h2>Formulario de contacto</h2>
                                    <Form.Input label='¿Como te llamas?' fluid placeholder='Escribe como te gustaría que te llamemos'
                                        value={this.state.name}
                                        onChange={(e, { value }) => this.setState({ name: value })}
                                        error={this.state.errorName}
                                    />
                                    <Form.Input label='En que email podemos contactarte' fluid placeholder='Escribe tu email' 
                                        value={this.props.email}
                                        onChange={(e, { value }) => this.setState({ email: value })}
                                        error={this.state.errorEmail}
                                    />
                                    <Form.Select label='¿Cuál es el motivo de tu contacto?:' fluid options={opciones} placeholder='Selecciona una de las siguientes opciones'
                                        value={this.props.asunto}
                                        onChange={(e, { value }) => this.setState({ asunto: value })}
                                        error={this.state.errorAsunto}
                                    />
                                    <Form.TextArea label='Danos un detalle más' placeholder='Describe con más detalle tu situación'
                                        onChange={(e, { value }) => { this.setState({ detalle: value }); }}
                                        value={this.state.detalle} />
                                    <Message
                                        error
                                        header={this.state.mensajeCodigo ? this.state.mensajeCodigo.titulo : 'Falta campos por llenar'}
                                        content={this.state.mensajeCodigo ? this.state.mensajeCodigo.detalle : 'Debes diligenciar todos los campos'}
                                    />
                                    <Form.Button content="Enviar" color="blue" fluid onClick={this.enviar}></Form.Button>
                                </Form>
                            </div >
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        menu: state.consulta.menu,
        busqueda: state.consulta.busqueda,
        row: state.consulta.row,
    };
};

export default connect(mapStateToProps, { nameForm })(ContactoForm);




