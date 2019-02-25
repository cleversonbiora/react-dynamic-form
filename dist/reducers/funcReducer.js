import { UPDATE_FUNC_STATE } from '../actions/actionTypes';

export const funcReducer = (state = JSON.parse('{}'), action) => {
  switch (action.type) {
    case UPDATE_FUNC_STATE:
      return action.json;
    default:
      return state;
  }
};