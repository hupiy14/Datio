import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { VerMenu } from '../actions';
import SearchBar from './SearchBar';
import Datio from '../Images/Datio.JPG';

class HeaderP extends React.Component {

    state = { visible: false }

    render() {
        return (
            <div className="ui secondary pointing menu">
                <a className="item" onClick={() => { this.props.VerMenu(!this.props.menu); }}>
                    <i className="sidebar circular large icon"></i>
                </a>
                <Link to="/busqueda/." className="item" >
                    <img className="ui tiny rounded image" src={Datio} id='1' key='1' alt="ds" />
                </Link>
                <div className="right menu" style={{ width: '100%' }}>
                    <SearchBar />
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        menu: state.consulta.menu,
    };
};

export default connect(mapStateToProps, {VerMenu})(HeaderP); 
