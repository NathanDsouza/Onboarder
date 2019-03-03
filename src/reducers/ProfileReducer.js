import {
    FIRST_NAME_CHANGED,
    LAST_NAME_CHANGED,
    USERNAME_CHANGED,
    PROFILE_CREATE_SUCCESS,
    PROFILE_CREATE_FAIL,
    PROFILE_CREATE,
} from '../actions/types'

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    username: '',
    error: '',
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
   
    console.log(action);
    console.log(state);
    switch(action.type){
        
        case FIRST_NAME_CHANGED:
            return {...state, firstName: action.payload};
        case LAST_NAME_CHANGED:
            return {...state, lastName: action.payload};
        case USERNAME_CHANGED:
            return{...state, username: action.payload};
        case PROFILE_CREATE:
            return{...state,...INITIAL_STATE};
        default:
            return state;
    }
}