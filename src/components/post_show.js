import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import { fetchPost } from '../actions';
import { deletePost } from '../actions';
import { editPost } from "../actions";



class PostShow extends Component {
    componentDidMount(){
        const { nombre } = this.props.match.params;
        this.props.fetchPost(nombre);
    }

    onDeleteClick(){
        const { nombre } = this.props.match.params;
        this.props.deletePost(nombre, () => {
            this.props.history.push('/');
        });
    }

    onEditClick(){
        const { nombre } = this.props.match.params;
        this.props.history.push(`/equipos/edit/${nombre}`);
    }

    render(){
        const { post } = this.props;
        
        if(!post){
            return <div>Loading...</div>;
        }
        return (
            <div>
                <Link className="btn btn-primary" to="/">Ir a inicio</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}>
                    Mandar a la B
                </button>
                <button
                    className="btn btn-primary"
                    onClick={this.onEditClick.bind(this)}>
                    Editar Equipo
                </button>
                <h3>{post.nombre}</h3>
                <h6>Año de fundación: {post.ano_fun}</h6>
                <p>{post.titulos}</p>
            </div>
        );
    } 
}

//se pone {posts} para coger ese atributo de primera
function mapStateToProps({posts}, ownProps){
    return { post: posts[ownProps.match.params.nombre] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);