import { ADD_USER, SET_USERS, DELETE_USER } from '../constants';
import u from '../users';

const users = (state = u, action) => {
  switch (action.type) {
    case SET_USERS: {
      const users = action.payload;
      return [...users];
    }
    case ADD_USER: {
      const user = action.payload;
      return [...state, user];
    }
    case DELETE_USER: {
      const index = action.payload;
      return state.filter((user) => user.id !== index);
    }
    default:
      return state;
  }
};

export default users;
