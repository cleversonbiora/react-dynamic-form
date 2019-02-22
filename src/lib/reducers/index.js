import { formReducer } from './formReducer';
import { valueReducer } from './valueReducer';
import { funcReducer } from './funcReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  formState: formReducer,
  funcState: funcReducer,
  valueState: valueReducer
});
