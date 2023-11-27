import {
    put, call, takeLatest
} from 'redux-saga/effects';
import Types from '../actions/actionTypes';
import api from '../api';
import Messages from '../theme/Messages'

const {
    getSubscription,
    addSubscription,
    cancelSubscription,
} = api;

function* GetSubscription(action) {
  yield put({ type: Types.GET_SUBSCRIPTION_REQUEST });
  try {
    const res = yield call(getSubscription, action.user_id, action.productId);
    if (res.result) {
      yield put({ type: Types.GET_SUBSCRIPTION_SUCCESS, payload: res.subscription });
    } else {
      yield put({ type: Types.GET_SUBSCRIPTION_FAILURE, error: res.error });
    }
  } catch (error) {
    yield put({ type: Types.GET_SUBSCRIPTION_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

function* AddSubscription(action) {
  yield put({ type: Types.ADD_SUBSCRIPTION_REQUEST });
  try {
    const res = yield call(addSubscription, action.user_id, action.data);
    if (res.result) {
      yield put({ type: Types.ADD_SUBSCRIPTION_SUCCESS, payload: res.subscription });
    } else {
      yield put({ type: Types.ADD_SUBSCRIPTION_FAILURE, error: res.error });
    }
  } catch (error) {
    yield put({ type: Types.ADD_SUBSCRIPTION_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

function* CancelSubscription(action) {
  yield put({ type: Types.CANCEL_SUBSCRIPTION_REQUEST });
  try {
    const res = yield call(cancelSubscription, action.user_id, action.productId);
    if (res.result) {
      yield put({ type: Types.CANCEL_SUBSCRIPTION_SUCCESS, payload: res.subscription });
    } else {
      yield put({ type: Types.CANCEL_SUBSCRIPTION_FAILURE, error: res.error });
    }
  } catch (error) {
    yield put({ type: Types.CANCEL_SUBSCRIPTION_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

export default [
    takeLatest(Types.GET_SUBSCRIPTION, GetSubscription),
    takeLatest(Types.ADD_SUBSCRIPTION, AddSubscription),
    takeLatest(Types.CANCEL_SUBSCRIPTION, CancelSubscription),
];