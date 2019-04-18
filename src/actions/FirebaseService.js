import firebase from '@firebase/app';
import '@firebase/database';
import '@firebase/auth';
import NavigationService from './NavigationService';

import {
  CREATE_ROOM,
  PROFILE_CREATE,
  USERNAME_SET,
  USERNAME_TAKEN,
  PROFILE_CREATE_SUCCESS,
  PROFILE_CREATE_FAIL,
  UPDATE_PROFILE,
} from './types';

function checkIfUsernameAvailable(username) {
  const usernameLower = username.toLowerCase();
  const usernamePath = `/usernames/${usernameLower}`;
  const ref = firebase.database().ref(usernamePath);
  const snapshot = ref.once('value').then(snapshot => {
    return snapshot.exists();
  });

  return snapshot;
}

export async function addProfile(dispatch, firstName, lastName, username) {
  const { currentUser } = firebase.auth();
  dispatch({ type: PROFILE_CREATE });
  const taken = await checkIfUsernameAvailable(username);
  if (!taken) {
    firebase
      .database()
      .ref(`/usernames/${username}`)
      .update({ uid: currentUser.uid })
      .then(() => {
        dispatch({ type: USERNAME_SET });
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    dispatch({ type: USERNAME_TAKEN, payload: 'Username taken' });
    return;
  }

  firebase
    .database()
    .ref(`/users/${currentUser.uid}`)
    .update({ firstName, lastName, username })
    .then(() => {
      dispatch({ type: PROFILE_CREATE_SUCCESS, firstName, lastName, username });
      NavigationService.resetNavigation('Welcome');
    })
    .catch(error => {
      console.log('error is ', error);
      dispatch({ type: PROFILE_CREATE_FAIL, payload: error.toString() });
    });
}

export function joinRoom(dispatch, roomId, profile, stack) {
  const { email, username, firstName, lastName } = profile;
  const { currentUser } = firebase.auth();
  const updateRoom = {};
  //need to grab room data
  //need to check if room exists
  updateRoom[currentUser.uid] = {
    stack: stack,
    firstName: firstName,
    username: username,
  };
  firebase
    .database()
    .ref(`/rooms/${roomId}/members`)
    .update(updateRoom)
    .then(() => {
      console.log('success');
      NavigationService.resetNavigation('Room');
    })
    .catch(error => {
      console.log('fail');
    });
}

export function getUserData() {
  const { currentUser } = firebase.auth();
  console.log('before');
  return firebase
    .database()
    .ref(`/users/${currentUser.uid}`)
    .once('value')
    .then(function(snapshot) {
      return snapshot.val();
    });
}

export async function setUserData(dispatch) {
  const userData = await getUserData();
  const { username, firstName, lastName, email } = userData;
  dispatch({
    type: UPDATE_PROFILE,
    username,
    firstName,
    lastName,
    email,
  });
}

export async function addRoom(dispatch, stack, blind) {
  const roomId = '1234';
  console.log('oh hi mark ', blind, stack);
  const { currentUser } = firebase.auth();
  const updateRoom = {};
  updateRoom[roomId] = {
    bigBlind: blind,
    startingStack: stack,
    host: currentUser.uid
  };

  console.log(updateRoom);

  dispatch({ type: CREATE_ROOM });

  firebase
    .database()
    .ref('/rooms/')
    .update(updateRoom)
    .then(() => {
      console.log('success');
    })
    .catch(error => {
      console.log('fail');
    });
}

function checkIfRoomExists(roomId) {
  const ref = firebase.database().ref(`/rooms/${roomId}`);
  const snapshot = ref.once('value').then(snapshot => {

    return snapshot.val();
  });

  return snapshot;
}

export async function validateRoom(dispatch, roomId) {
  const snapshot = await checkIfRoomExists(roomId);
  if (snapshot) {
    const {stack, bigBlind} = snapshot;
   dispatch({
  type: UPDATE_ROOM, stack, bigBlind
  });

  } else {
   // dispatch({ type: USERNAME_TAKEN, payload: "Username taken" });
    return;
  }

}
