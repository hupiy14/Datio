import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';

class Envio extends React.Component {

    renderActions() {
        return (
            <div>
                <React.Fragment>
                    <Link to="/busqueda/." className="ui button blue">Continuar</Link>
                </React.Fragment>
            </div>
        );
    }

    renderContent() {
        return `Tu consulta se ha enviado correctamente  ${this.props.nameF}`;
    }

    render() {
        return (
            <Modal
                title="¡Pronto te contactaremos..!"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/busqueda/.')}
            />
        );
    }
};

const mapStateToProps = (state) => {
    return {
        nameF: state.consulta.nameF,
    };
};

export default connect(mapStateToProps)(Envio);
