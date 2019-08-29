import React from 'react';
import { connect } from 'react-redux';
import { Table, } from 'semantic-ui-react';
import { selectRow } from '../../actions';
import history from '../../history';

class RowTable extends React.Component {

    state = { indice: 0, activate: false };

    componentDidMount() {
        this.setState({ indice: this.props.indice })
    }

    render() {
        const { height, width, alt_description, user, id } = this.props.element;

        return (
            <Table.Row key={this.state.indice}
                active={this.props.row && this.props.row.indice === this.state.indice ? this.state.activate : false}
                onClick={() => {
                    this.props.selectRow({ indice: this.state.indice, element: this.props.element });
                    this.setState({ activate: true })
                    history.push('/busqueda/' + id);
                }}>
                <Table.Cell>{alt_description}</Table.Cell>
                <Table.Cell>{height} px</Table.Cell>
                <Table.Cell>{width} px</Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
            </Table.Row >
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

export default connect(mapStateToProps, { selectRow })(RowTable);



