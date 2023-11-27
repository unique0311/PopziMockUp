import { all } from 'redux-saga/effects';
import userSagas from './user';
import subscriptionSagas from './subscription';

export default function* sagas() {
  yield all([
    ...userSagas,
    ...subscriptionSagas,
  ]);
}
