import { UPDATE_STATE } from '../actions/actionTypes';

export const formReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_STATE:
      return action.json;
    default:
      return state;
  }
}
