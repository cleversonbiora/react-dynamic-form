import { CHANGE_VALUE, ADD_FORM, UPDATE_STATE, ADD_VALUE, UPDATE_FUNC_STATE, CHANGE_VALIDATION, ADD_VALIDATION, ADD_VALIDATOR } from './actionTypes';

export const changeFormValue = value => ({
  type: CHANGE_VALUE,
  payload: value
});
export const addFormValue = value => ({
  type: ADD_VALUE,
  payload: value
});
export const addForm = value => ({
  type: ADD_FORM,
  key: value
});
export const changeValidationValue = value => ({
  type: CHANGE_VALIDATION,
  payload: value
});
export const addValidationValue = value => ({
  type: ADD_VALIDATION,
  payload: value
});
export const addValidator = value => ({
  type: ADD_VALIDATOR,
  payload: value
});
export const updateFormState = value => ({
  type: UPDATE_STATE,
  json: value
});
export const updateFuncState = value => ({
  type: UPDATE_FUNC_STATE,
  json: value
});
