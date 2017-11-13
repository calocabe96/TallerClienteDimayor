import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editPost } from '../actions';
import _ from 'lodash';

class PostsEdit extends Component {


    renderField(field) {

        const { meta: { touched, error} } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (

            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input}/>
                <div className="text-help">
                    {touched ? error : ''}
                </div>

            </div>
        );
    }

    onSubmit(values) {
        const { nombre } = this.props.match.params; 
        console.log(nombre);       
        const values1 = {"ano_fun": values.ano_fun,
                        "nombre": nombre ,
                        "titulos": values.titulos};
        console.log(values1);
        this.props.editPost(values1, () => {    
            this.props.history.push('/equipos');
        });
    }

    render() {

        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field label="Año fundación" name="ano_fun" component={this.renderField}/>
                <Field label="Títulos ganados" name="titulos" component={this.renderField}/>
                <button type="submit" className="btn btn-primary">Editar</button>
                <Link className="btn btn-danger" to="/">
                    Cancelar 
                </Link>

                
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    //validate the inpust from 'values'
    if (!values.ano_fun) {
        errors.ano_fun = "Debe llenar este campo con números";
    }

    if (!values.titulos) {
        errors.titulos = "Debe llenar este campo con números";
    }
    // if errors is empty, the form is fine to submit If errors has any properties,
    // redux form assumes form is invalid
    return errors;
}

function mapStateToProps({posts}, ownProps){
    return { post: posts[ownProps.match.params.nombre] };
}

export default reduxForm({
    validate, 
    form: 'PostEditForm'
})(
    connect(mapStateToProps,{ editPost })(PostsEdit)
);
