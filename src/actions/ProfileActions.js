import firebase from '@firebase/app';
import '@firebase/auth'
import NavigationService from './NavigationService';


import {
    FIRST_NAME_CHANGED,
    LAST_NAME_CHANGED,
    USERNAME_CHANGED,
    PROFILE_CREATE_SUCCESS,
    PROFILE_CREATE_FAIL,
    PROFILE_CREATE,
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

export const profileCreate = ({first, last, username}) =>{
    return (dispatch) => {
        dispatch({type: PROFILE_CREATE});
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
};}

