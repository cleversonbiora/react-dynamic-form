import { CHANGE_VALUE, UPDATE_STATE, ADD_VALUE } from './actionTypes';

export const changeFormValue = value => ({
  type: CHANGE_VALUE,
  payload: value
});
export const addFormValue = value => ({
  type: ADD_VALUE,
  payload: value
});
export const updateFormState = value => ({
  type: UPDATE_STATE,
  json: value
});
