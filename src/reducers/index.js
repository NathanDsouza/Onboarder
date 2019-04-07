import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer'
import RoomReducer from './RoomReducer'

export default combineReducers({
    auth: AuthReducer,
    profile: ProfileReducer,
    room: RoomReducer,
});