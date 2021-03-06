var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { ADD_VALIDATION, CHANGE_VALIDATION } from '../actions/actionTypes';

export const validationReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_VALIDATION:
      return _extends({}, state, {
        [action.payload.key]: { value: action.payload.value, valid: action.payload.valid }
      });
    case CHANGE_VALIDATION:
      return _extends({}, state, {
        [action.payload.key]: { value: action.payload.value, valid: action.payload.valid }
      });
    default:
      return state;
  }
};