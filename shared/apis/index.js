import {FEED_STG,DARE_STG, BASE_URL_CORE_STG, BASE_URL_AUTHENTICATION} from './urls';

export const loadFeeds = async options => {
  const queryParams = new URLSearchParams(options);
  const url = `${FEED_STG}/Feeds/feedsByUserId?` + queryParams;
  return await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const loadDares = async options => {
  const queryParams = new URLSearchParams(options);
  const url = `${DARE_STG}/dares?` + queryParams;
  return await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      fmsvisitorid:undefined
    },
  });
};

export const authentication = async options => {
  const url = `${BASE_URL_AUTHENTICATION}/registration/authentication`;
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      fmsvisitorid:undefined
    },
    method: "POST",
    body: JSON.stringify(options)
  };
  return await fetch(url, fetchOptions);
};

export const otpVerify = async options => {
  const url = `${BASE_URL_AUTHENTICATION}/registration/otp-verification`;
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      fmsvisitorid:undefined
    },
    method: "POST",
    body: JSON.stringify(options)
  };
  return await fetch(url, fetchOptions);
};

export const aliasInput = async (options) => {
  const url = `${BASE_URL_CORE_STG}/registration/alias`;
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      fmsvisitorid:undefined,
      authorization: options.authToken
    },
    method: "POST",
    body: JSON.stringify(options.params)
  };
  return await fetch(url, fetchOptions);
};

export const birthDateRegistration = async (options) => {
  const url = `${BASE_URL_CORE_STG}/registration/extended-signup-birthdate`;
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      fmsvisitorid:undefined,
      authorization: options.authToken
    },
    method: "POST",
    body: JSON.stringify(options.params)
  };
  return await fetch(url, fetchOptions);
};

export const genderCountryRegistration = async (options) => {
  const url = `${BASE_URL_CORE_STG}/registration/extended-signup-personalInfo`;
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      fmsvisitorid:undefined,
      authorization: options.authToken
    },
    method: "POST",
    body: JSON.stringify(options.params)
  };
  return await fetch(url, fetchOptions);
};

export const countriesList = async authToken => {
  const url = `${BASE_URL_CORE_STG}/Countries`;
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      fmsvisitorid: undefined,
      authorization: authToken,
    },
    method: 'GET',
    cache: "no-cache"
  };
  return await fetch(url, fetchOptions);
};


export const post = async (url, param, header, authToken) => {
  const headers = {
    Method: 'POST',
    Headers: {
      'Content-Type': 'application/json',
      fmsvisitorid: undefined,
      authorization: authToken,
    },
    Body: param,
    Cache: 'no-cache'
  }
  await fetch(url, headers)
  .then(response => {
    //handle response            
    // console.log(response);
    response.json()
  })
  .then(data => {
    //handle data
    // console.log(data);
    return data;
  })
  .catch(error => {
    //handle error
    return error;
  });
}