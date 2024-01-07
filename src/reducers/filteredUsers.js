import { SET_FILTERED_USERS, ADD_FILTERED_USER, DELETE_FILTERED_USER } from '../constants';
import u from '../users';

const filteredUsers = (state = u, action) => {
  switch (action.type) {
    case SET_FILTERED_USERS: {
      const users = action.payload;
      return [...users];
    }
    case ADD_FILTERED_USER: {
      const user = action.payload;
      return [...state, user];
    }
    case DELETE_FILTERED_USER: {
      const index = action.payload;
      return state.filter((user) => user.id !== index);
    }
    default:
      return state;
  }
};

export default filteredUsers;
