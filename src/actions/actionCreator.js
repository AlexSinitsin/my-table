import {
  SET_USERS,
  ADD_USER,
  DELETE_USER,
  SET_FILTERED_USERS,
  ADD_FILTERED_USER,
  DELETE_FILTERED_USER
} from '../constants';

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users
});
export const addUser = (user) => ({
  type: ADD_USER,
  payload: user
});
export const deleteUser = (index) => ({
  type: DELETE_USER,
  payload: index
});
export const setFilteredUsers = (users) => ({
  type: SET_FILTERED_USERS,
  payload: users
});
export const addFilteredUser = (user) => ({
  type: ADD_FILTERED_USER,
  payload: user
});
export const deleteFilteredUser = (index) => ({
  type: DELETE_FILTERED_USER,
  payload: index
});
