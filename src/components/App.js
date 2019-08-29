import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Busqueda from './Busqueda';
import Contacto from './FormularioContacto';
import Enviar from './EnviarFormulario/Enviar';
import Header from './Header';
import history from '../history';

class App extends React.Component {

    componentDidMount(){
        history.push('/busqueda/.');
    }
    
    render() {
        return (
            <div className="ui container">
                <Router history={history}>
                    <div>
                        <Header />
                        <Switch>
                            <Route path="/busqueda/:id" exact component={Busqueda} />
                            <Route path="/contacto" exact component={Contacto} />
                            <Route path="/enviarconsulta" exact component={Enviar} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    };
}

export default App; 