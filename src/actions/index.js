import { CHANGE_VALUE, UPDATE_STATE, ADD_VALUE } from './actionTypes';

export const changeValue = value => ({
  type: CHANGE_VALUE,
  payload: value
});
export const addValue = value => ({
  type: ADD_VALUE,
  payload: value
});
export const updateState = value => ({
  type: UPDATE_STATE,
  json: value
});
