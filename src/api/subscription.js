import { url } from '../constants';

////////////////////////////////////////////////////////////////////////////
//////////////////////////// Get Subscription //////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const getSubscription = (user_id, productId) => {
    const method = 'POST';
    const request_url = `${url}/subscription/get_subscription`
    const headers = {
      'Content-Type': 'application/json',
    }
    const body = JSON.stringify({
        user_id,
        productId
    });
  
    return fetch(request_url, { method, body, headers})
      .then((res) => res.json());
};

////////////////////////////////////////////////////////////////////////////
//////////////////////////// Add Subscription //////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const addSubscription = (user_id, data) => {
    const method = 'POST';
    const request_url = `${url}/subscription/add_subscription`
    const headers = {
      'Content-Type': 'application/json',
    }
    const body = JSON.stringify({
        user_id,
        ...data
    });
  
    return fetch(request_url, { method, body, headers})
      .then((res) => res.json());
};

////////////////////////////////////////////////////////////////////////////
//////////////////////////// Get Subscription //////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const cancelSubscription = (user_id, productId) => {
    const method = 'POST';
    const request_url = `${url}/subscription/cancel_subscription`
    const headers = {
      'Content-Type': 'application/json',
    }
    const body = JSON.stringify({
        user_id,
        productId
    });
  
    return fetch(request_url, { method, body, headers})
      .then((res) => res.json());
};