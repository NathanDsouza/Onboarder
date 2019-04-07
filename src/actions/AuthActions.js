import firebase from "@firebase/app";
import "@firebase/database";
import "@firebase/auth";
import NavigationService from "../actions/NavigationService";
import { setUserData } from "./FirebaseService";

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  NEW_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_PROFILE
} from "./types";

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        setUserData(dispatch);
        loginUserSuccess(dispatch, user);
      })
      .catch(error => {
        console.log(error);
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => {
            const { currentUser } = firebase.auth();
            firebase
              .database()
              .ref(`/users/${currentUser.uid}`)
              .set({ email })
              .then(() => {
                newUserSuccess(dispatch, user, email);
              })
              .catch(error => {
                console.log(error);
                loginUserFail(dispatch, error);
              });
          })
          .catch(error => {
            console.log(error);
            loginUserFail(dispatch, error);
          });
      });
  };
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  NavigationService.resetNavigation("Welcome");
};

const newUserSuccess = (dispatch, user, email) => {
  dispatch({
    type: NEW_USER_SUCCESS,
    payload: user,
  });
  dispatch({
    type: UPDATE_PROFILE,
    email,
  })
  NavigationService.resetNavigation("Profile");
};

const loginUserFail = (dispatch, error) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: error.toString()
  });
};

export const logoutUser = () => {
  return dispatch => {
    firebase
      .auth()
      .signOut()
      .then(user => logoutUserSuccess(dispatch, user))
      .catch(error => {
        console.log(error);
      });
  };
};

const logoutUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGOUT_USER,
    payload: user
  });
  NavigationService.resetNavigation("LandingScreen");
};
