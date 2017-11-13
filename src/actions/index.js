import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';
export const CREATE_POST = 'create_post';
export const EDIT_POST = 'edit_post';
const ROUTE_URL = 'http://localhost:4567/equipos';

export function fetchPosts(){
    const request = axios.get(`${ROUTE_URL}`);
    
    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function createPost(values, callback){

    const request = axios.post(`${ROUTE_URL}`, values)
        .then(() => callback());

    return {
        type: CREATE_POST,
        payload: request
    }
}

export function fetchPost(nombre){

    const request = axios.get(`${ROUTE_URL}/${nombre}`);

    return {
        type: FETCH_POST,
        payload: request
    }
}

export function deletePost(nombre, callback){
    console.log(nombre);
    const request = axios.delete(`${ROUTE_URL}/${nombre}`)
        .then(() => callback());
    return{
        type: DELETE_POST,
        payload: nombre
    }
}

export function editPost(values,callback){
        const request = axios.put(`${ROUTE_URL}`, values)
            .then(() => callback());
    
        return {
            type: EDIT_POST,
            payload: request
        }
    }