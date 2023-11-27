import { createReducer } from 'reduxsauce';
import Types from '../actions/actionTypes';
import { Status } from '../constants';

export const initialState = {
    getSubscriptionStatus: Status.NONE,
    addSubscriptionStatus: Status.NONE,
    cancelSubscriptionStatus: Status.NONE,
    currentSubscription: null,
    errorMessage: '',
};

/////////////////////////////////////////////////////
///////////////// Get Subscription //////////////////
/////////////////////////////////////////////////////
const getSubscriptionRequest = (state) => ({
    ...state,
    getSubscriptionStatus: Status.REQUEST,
});
  
const getSubscriptionSuccess = (state, action) => ({
    ...state,
    currentSubscription: action.payload,
    getSubscriptionStatus: Status.SUCCESS,
});
  
const getSubscriptionFailure = (state, action) => ({
    ...state,
    errorMessage: action.error,
    getSubscriptionStatus: Status.FAILURE,
});

/////////////////////////////////////////////////////
///////////////// Add Subscription //////////////////
/////////////////////////////////////////////////////
const addSubscriptionRequest = (state) => ({
    ...state,
    addSubscriptionStatus: Status.REQUEST,
});
  
const addSubscriptionSuccess = (state, action) => ({
    ...state,
    currentSubscription: action.payload,
    addSubscriptionStatus: Status.SUCCESS,
});
  
const addSubscriptionFailure = (state, action) => ({
    ...state,
    errorMessage: action.error,
    addSubscriptionStatus: Status.FAILURE,
});

/////////////////////////////////////////////////////
///////////////// Cancel Subscription //////////////////
/////////////////////////////////////////////////////
const cancelSubscriptionRequest = (state) => ({
    ...state,
    cancelSubscriptionStatus: Status.REQUEST,
});
  
const cancelSubscriptionSuccess = (state, action) => ({
    ...state,
    currentSubscription: action.payload,
    cancelSubscriptionStatus: Status.SUCCESS,
});
  
const cancelSubscriptionFailure = (state, action) => ({
    ...state,
    errorMessage: action.error,
    cancelSubscriptionStatus: Status.FAILURE,
});
const actionHandlers = {
    [Types.GET_SUBSCRIPTION_REQUEST]: getSubscriptionRequest,
    [Types.GET_SUBSCRIPTION_SUCCESS]: getSubscriptionSuccess,
    [Types.GET_SUBSCRIPTION_FAILURE]: getSubscriptionFailure,

    [Types.ADD_SUBSCRIPTION_REQUEST]: addSubscriptionRequest,
    [Types.ADD_SUBSCRIPTION_SUCCESS]: addSubscriptionSuccess,
    [Types.ADD_SUBSCRIPTION_FAILURE]: addSubscriptionFailure,

    [Types.CANCEL_SUBSCRIPTION_REQUEST]: cancelSubscriptionRequest,
    [Types.CANCEL_SUBSCRIPTION_SUCCESS]: cancelSubscriptionSuccess,
    [Types.CANCEL_SUBSCRIPTION_FAILURE]: cancelSubscriptionFailure,
}

export default createReducer(initialState, actionHandlers);