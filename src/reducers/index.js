import { combineReducers } from 'redux';
import user from './user';
import subscription from './subscription';

const applicationReducers = {
  user,
  subscription,
};

export default function createReducer() {
  return combineReducers(applicationReducers);
}
