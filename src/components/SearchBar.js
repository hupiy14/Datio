import React from 'react';
import history from '../history';
import { connect } from 'react-redux';
import { Buscar } from '../actions';


class SearchBar extends React.Component {

    onsubmitS =(e) =>{
        e.preventDefault(); 
        this.props.Buscar({ ...this.props.busqueda, buscar: true });
        history.push('/busqueda/.');
    }

    render() {
        return (
            <div className="ui segment" style={{ width: '70%', border: 'hidden', height: '4.8em' }} >
                <form className="ui form" onSubmit={this.onsubmitS }>
                    <div class="two fields">
                        <div class="one wide field" onClick={this.onsubmitS}
                            style={{ position: 'relative', top: '0.2em' }}>
                            <i class="search large icon"></i>
                        </div>
                        <div class="fifteen wide field">
                            <input
                                type="text"
                                placeholder="Buscar imágenes relacionadas"
                                value={this.props.busqueda ? this.props.busqueda.concepto : ''}
                                onChange={e => this.props.Buscar({ ...this.props.busqueda, concepto: e.target.value })} />
                        </div>
                    </div>
                </form>
            </div >
        );
    }
}


const mapStateToProps = (state) => {
    return {
        busqueda: state.consulta.busqueda,
    };
};

export default connect(mapStateToProps, { Buscar })(SearchBar); 