import { UPDATE_FUNC_STATE } from '../actions/actionTypes';

export const funcReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FUNC_STATE:
      return action.json;
    default:
      return state;
  }
};