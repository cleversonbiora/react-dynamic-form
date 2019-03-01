import { ADD_VALIDATOR, ADD_FORM } from '../actions/actionTypes';

export const validatorReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_FORM:
      return{
        ...state,
        [action.key]:{}
      }
    case ADD_VALIDATOR:
      return{
        ...state,
        [action.payload.form]:{...state[action.payload.form],[action.payload.key]:action.payload.value}
      }
    default:
      return state;
  }
}
