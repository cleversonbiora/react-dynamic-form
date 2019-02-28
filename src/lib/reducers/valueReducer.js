import { ADD_VALUE, CHANGE_VALUE, ADD_FORM } from '../actions/actionTypes';

export const valueReducer = (state = JSON.parse('{}'), action) => {
  switch (action.type) {
    case ADD_FORM:
      return{
        ...state,
        [action.key]:{}
      }
    case ADD_VALUE:
      return{
        ...state,
        [action.payload.form]:{...state[action.payload.form],[action.payload.key]:action.payload.value}
      }
    case CHANGE_VALUE:
      return{
        ...state,
        [action.payload.form]:{...state[action.payload.form],[action.payload.key]:action.payload.value}
      }
    default:
      return state;
  }
}
