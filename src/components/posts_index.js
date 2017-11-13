import React, { Component} from 'react';
import { connect } from 'react-redux';  
import { fetchPosts } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
class PostsIndex extends Component{

    componentDidMount() {
        this.props.fetchPosts();
        
    }

     renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <tr className="equipo_row" key={post.nombre}>
                    <td className="td-item">
                        <Link to={`/equipos/${post.nombre}`}>
                            {post.nombre}
                        </Link>
                    </td>
                    <td className="td-item">
                            {post.ano_fun}
                    </td>
                    <td className="td-item">
                            {post.titulos}
                    </td>
                </tr>
            );
        });
     }
    render(){
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/equipos/new">
                    Añadir equipo 
                    </Link>
                </div>
                
                <img className="imgLiga" src="http://www.movilescolombia.com/wp-content/uploads/2013/09/Dimayor-colombia.jpg">
                </img>
                <img className="imgLiga1" src="https://upload.wikimedia.org/wikipedia/en/7/74/LigaAguila.png"> 
                </img>
                
                    
                <h3>Equipos</h3>
                <table className="table">
                    <tbody id="info">
                        <tr>
                            <th>Nombre</th>
                            <th>Año fundado</th>
                            <th>Títulos</th>
                        </tr>
                            {this.renderPosts()}
                    </tbody>

                </table>    

            </div>
        );
    }
}

function mapStateToProps(state){
    return { posts: state.posts };
}

export default connect (mapStateToProps, {fetchPosts})(PostsIndex);