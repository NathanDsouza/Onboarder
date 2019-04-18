import {
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  USERNAME_CHANGED,
  PROFILE_CREATE_SUCCESS,
  PROFILE_CREATE_FAIL,
  PROFILE_CREATE,
  USERNAME_AVAILABLE,
  USERNAME_SET,
  USERNAME_TAKEN,
  UPDATE_PROFILE
} from "../actions/types";

const INITIAL_STATE = {
  email: '',
  firstName: "",
  lastName: "",
  username: "",
  error: "",
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  console.log('Profile Reducer');
  console.log(action);
  console.log(state);
  switch (action.type) {
    case FIRST_NAME_CHANGED:
      return { ...state, firstName: action.payload };
    case LAST_NAME_CHANGED:
      return { ...state, lastName: action.payload };
    case USERNAME_CHANGED:
      return { ...state, username: action.payload, error: "" };
    case PROFILE_CREATE:
      return { ...state };
    case PROFILE_CREATE_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case USERNAME_SET:
      return { ...state };
    case USERNAME_AVAILABLE:
      return { ...state };
    case USERNAME_TAKEN:
      return { ...state, error: action.payload };
    case UPDATE_PROFILE:
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        username: action.username,
      };
    default:
      return state;
  }
};
