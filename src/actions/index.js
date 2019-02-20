import { CHANGE_VALUE, UPDATE_STATE, ADD_VALUE } from './actionTypes';

export const onChangeValue = value => ({
  type: CHANGE_VALUE,
  texto: value
});
export const addValue = value => ({
  type: ADD_VALUE,
  payload: value
});
export const updateState = value => ({
  type: UPDATE_STATE,
  json: value
});
