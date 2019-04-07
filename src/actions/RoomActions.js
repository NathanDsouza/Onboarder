import firebase from '@firebase/app';
import  '@firebase/database';
import  '@firebase/auth';
import NavigationService from './NavigationService';
import { addRoom, joinRoom } from './FirebaseService';


import {
   CREATE_ROOM,
} from './types'


export const createRoom = (stack, blind) =>{
    return (dispatch, getState) => {
        const blub = getState()
        console.log("getstate gives")
        console.log(blub)
    const roomId = '1234';
    addRoom(dispatch, stack, blind);
    joinRoom(dispatch, roomId);
    }
};

export const joinGame = (roomId) =>{
    return (dispatch, getState) => {
        const blub = getState()
        console.log("getstate gives")
        console.log(blub)
    joinRoom(dispatch, roomId)  
    }
};

const profileCreateSuccess = (dispatch, user) => {
    dispatch({
        type: PROFILE_CREATE_SUCCESS,
        payload: user
    });
    NavigationService.navigate('Welcome');
};

const profileCreateFail = (dispatch, error) => {
    dispatch({
        type: PROFILE_CREATE_FAIL,
        payload: error.toString()
    });
};

