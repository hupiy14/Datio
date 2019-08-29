import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';
import { selectRow } from '../../actions';

class ImagePrev extends React.Component {

    state = { indice: 0, activate: false };

    render() {

        let tagsImage = null;
        let fechaCreate = null;

        if (this.props.row && this.props.row.element && this.props.row.element.tags.length > 0) {
            tagsImage = <div className="ui segemnt">
                <h4>Tags</h4>
                {this.props.row.element.tags
                    .map(t => <span key={t}>{t.title}</span>)
                    .reduce((prev, curr) => [prev, ', ', curr])}
            </div>
            fechaCreate = <div className="ui segemnt">
                <h4>Fecha</h4>
                {this.props.row.element.created_at}
            </div>
        }
        return (
            <div>
                <Image src={this.props.row && this.props.row.element ? this.props.row.element.urls.regular : "http://www.gersal.com/assets/images/image-not-found.png"} />
                {tagsImage}
                <br></br>
                {fechaCreate}
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

export default connect(mapStateToProps, { selectRow })(ImagePrev);



