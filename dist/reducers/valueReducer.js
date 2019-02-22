var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { ADD_VALUE, CHANGE_VALUE } from '../actions/actionTypes';

export const valueReducer = (state = JSON.parse('{}'), action) => {
  switch (action.type) {
    case ADD_VALUE:
      return _extends({}, state, {
        [action.payload.key]: action.payload.value
      });
    case CHANGE_VALUE:
      return _extends({}, state, {
        [action.payload.key]: action.payload.value
      });
    default:
      return state;
  }
};