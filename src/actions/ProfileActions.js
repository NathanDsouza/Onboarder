import firebase from '@firebase/app';
import  '@firebase/database';
import  '@firebase/auth';
import NavigationService from './NavigationService';


import {
    FIRST_NAME_CHANGED,
    LAST_NAME_CHANGED,
    USERNAME_CHANGED,
    PROFILE_CREATE_SUCCESS,
    PROFILE_CREATE_FAIL,
    PROFILE_CREATE,
    USERNAME_AVAILABLE,
    USERNAME_TAKEN
} from './types'

export const firstNameChanged = (text) =>{
    return{
        type: FIRST_NAME_CHANGED,
        payload: text
    };
};

export const lastNameChanged = (text) =>{
    return{
        type: LAST_NAME_CHANGED,
        payload: text
    };
};

export const usernameChanged = (text) =>{
    return{
        type: USERNAME_CHANGED,
        payload: text
    };
};

export const profileCreate = ({firstName, lastName, username}) =>{
    const {currentUser} = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/usernames`)
        // .set({username})
        // .then(() => {
        //     dispatch({type: USERNAME_AVAILABLE});})
        // .catch((error) => {
        //     console.log(error);
        //     dispatch({type: USERNAME_TAKEN, payload: error.toString()});})

        firebase.database().ref(`/users/${currentUser.uid}`)
            .set({firstName, lastName, username})
            .then(() => {
                dispatch({type: PROFILE_CREATE});
                NavigationService.resetNavigation('Welcome');
            });
    };
      
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

