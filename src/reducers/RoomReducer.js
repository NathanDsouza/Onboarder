import {
   CREATE_ROOM
} from '../actions/types'

const INITIAL_STATE = {
    stack: '',
    blind: '',
    username: '',
    error: '',
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
   
    console.log("Room Reducer");
    console.log(action);
    console.log(state);
    switch(action.type){
    
        case CREATE_ROOM:
            return {...state};
        default:
            return state;
    }
}