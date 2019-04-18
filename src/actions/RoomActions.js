import firebase from '@firebase/app';
import '@firebase/database';
import '@firebase/auth';
import NavigationService from './NavigationService';
import { addRoom, joinRoom } from './FirebaseService';

import { CREATE_ROOM } from './types';

export const createRoom = (stack, blind) => (dispatch, getState) => {
  const state = getState();
  const { profile } = state;
  const roomId = '1234';
  addRoom(dispatch, stack, blind);
  joinRoom(dispatch, roomId, profile, stack);
};

export const joinGame = roomId => (dispatch, getState) => {
  const state = getState();
  const { profile, room } = state;
  const { stack } = room;
  joinRoom(dispatch, roomId, profile, stack);
};
