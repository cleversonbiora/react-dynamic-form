import { formReducer } from './formReducer';
import { valueReducer } from './valueReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  formState: formReducer,
  valueState: valueReducer
});
