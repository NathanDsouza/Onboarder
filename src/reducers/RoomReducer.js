import { CREATE_ROOM, UPDATE_ROOM, JOIN_ROOM } from '../actions/types';

const INITIAL_STATE = {
  stack: '',
  blind: '',
  username: '',
  error: '',
  loading: false,
  roomId: '',
  pot: '',
  dealer: '',
  members: null,
  uid: '',
};

export default (state = INITIAL_STATE, action) => {
  console.log('Room Reducer');
  console.log(action);
  console.log(state);
  switch (action.type) {
    case CREATE_ROOM:
      return { ...state, pot: action.pot };
    case JOIN_ROOM:
      return {
        ...state,
        roomId: action.roomId,
        blind: action.bigBlind,
        stack: action.startingStack,
        pot: action.pot,
        uid: action.uid,
      };
    case UPDATE_ROOM:
      return { ...state, pot: action.pot, members: action.members, stack: action.members[state.uid].stack };
    default:
      return state;
  }
};
