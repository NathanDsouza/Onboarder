import firebase from '@firebase/app';
import '@firebase/database';
import '@firebase/auth';
import NavigationService from './NavigationService';
import { addRoom, joinRoom, fbStartRoomListener } from './FirebaseService';

import { CREATE_ROOM } from './types';

export const createRoom = (stack, blind) => (dispatch, getState) => {
  const state = getState();
  const { profile } = state;
  const roomId = '1234';
  addRoom(dispatch, stack, blind);
  joinRoom(dispatch, roomId, profile);
};

export const joinGame = roomId => (dispatch, getState) => {
  const state = getState();
  const { profile } = state;
  joinRoom(dispatch, roomId, profile);
};

export const startRoomListener = () => (dispatch, getState) => {
  const state = getState();
  const { room } = state;
  const { roomId } = room;
  fbStartRoomListener(dispatch, roomId);
}
