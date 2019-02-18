import { CHANGE_VALUE, UPDATE_STATE } from './actionTypes';

export const onChangeValue = value => ({
  type: CHANGE_VALUE,
  texto: value
});
export const updateState = value => ({
  type: UPDATE_STATE,
  json: value
});
