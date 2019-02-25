import { ADD_VALIDATION, CHANGE_VALIDATION } from '../actions/actionTypes';

export const validationReducer = (state = JSON.parse('{}'), action) => {
  switch (action.type) {
    case ADD_VALIDATION:
      return{
        ...state,
        [action.payload.key]:{ value: action.payload.value, valid: action.payload.valid}
      }
    case CHANGE_VALIDATION:
      return{
        ...state,
        [action.payload.key]:{ value: action.payload.value, valid: action.payload.valid}
      }
    default:
      return state;
  }
}
