import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action){

    switch(action.type){
    case FETCH_POSTS:
        return _.mapKeys(action.payload.data, 'nombre');

    case FETCH_POST:
        return { ...state, [action.payload.data.name]: action.payload.data };

    case DELETE_POST:
        return _.omit(state, action.payload);

    default:
        return state;
    }
}