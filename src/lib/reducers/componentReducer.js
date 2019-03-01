import { UPDATE_COMP_STATE } from '../actions/actionTypes';

export const componentReducer = (state = JSON.parse('{}'), action) => {
  switch (action.type) {
    case UPDATE_COMP_STATE:
      return action.json;
    default:
      return state;
  }
}
