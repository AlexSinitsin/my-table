import { combineReducers } from 'redux';
import users from './users';
import filteredUsers from './filteredUsers';

const rootReducer = combineReducers({ users, filteredUsers });

export default rootReducer;
