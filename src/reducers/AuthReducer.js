import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    NEW_USER_SUCCESS,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGOUT_USER,
} from '../actions/types'

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false,
    loggedIn: false,
};

export default (state = INITIAL_STATE, action) => {
    console.log("Auth Reducer");
    console.log(action);
    console.log(state);
    switch(action.type){
        
        case EMAIL_CHANGED:
            return {...state, email: action.payload};
        case PASSWORD_CHANGED:
            return {...state, password: action.payload};
        case LOGIN_USER:
            return{...state, loading: true, error: ''};
        case NEW_USER_SUCCESS:
            return {...state,...INITIAL_STATE, user: action.payload};
        case LOGIN_USER_SUCCESS:
            return {...state,...INITIAL_STATE, user: action.payload, loggedIn: true};
        case LOGIN_USER_FAIL:
            return {...state, error: action.payload, password: '', loading: false};
        case LOGOUT_USER:
            return{...state, user: action.payload, loggedIn: false};
        default:
            return state;
    }
}