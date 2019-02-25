import { ADD_VALIDATION, CHANGE_VALIDATION } from '../actions/actionTypes';

export const validationReducer = (state = JSON.parse('{}'), action) => {
  switch (action.type) {
    case ADD_VALIDATION:
      return{
        ...state,
        [action.payload.key]:action.payload.value
      }
    case CHANGE_VALIDATION:
      return{
        ...state,
        [action.payload.key]:action.payload.value
      }
    default:
      return state;
  }
}
