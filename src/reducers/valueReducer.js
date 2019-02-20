import { ADD_VALUE } from '../actions/actionTypes';

export const valueReducer = (state = JSON.parse('{}'), action) => {
  switch (action.type) {
    case ADD_VALUE:
      return{
        ...state,
        [action.payload.key]:action.payload.value
      }
    default:
      return state;
  }
}
