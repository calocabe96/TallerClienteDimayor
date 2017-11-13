import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

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
        this.props.createPost(values, () => {
            this.props.history.push('/equipos');
        });
    }

    render() {

        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field label="Nombre" name="nombre" component={this.renderField}/>
                <Field label="Año fundación" name="ano_fun" component={this.renderField}/>
                <Field label="Títulos ganados" name="titulos" component={this.renderField}/>
                <button type="submit" className="btn btn-primary">Crear</button>
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
    if (!values.nombre) {
        errors.nombre = "Debe llenar este campo";
    }

    if (!values.ano_fun) {
        errors.ano_fun = "Debe llenar este campo";
    }

    if (!values.titulos) {
        errors.titulos = "Debe llenar este campo";
    }
    // if errors is empty, the form is fine to submit If errors has any properties,
    // redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate, 
    form: 'PostNewForm'
})(
    connect(null,{ createPost })(PostsNew)
);