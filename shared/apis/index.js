import { getData, queryString } from '../utils/helper';
import {
  DARE_STG, 
  BASE_URL_CORE_STG, 
  BASE_URL_AUTHENTICATION, 
  BASE_URL_SIGNED_URL, 
  BASE_URL_MEDIA_STG, 
  FEED_NEXT_STG} from './urls';

export const isFeedNext = url => url.includes("://feed-next");
export const isCommunication = url => url.includes("://communication");
export const isPartners = url => url.includes("://partner");
export const isDare = url => url.includes("://dare");
export const isMediaNext = url => url.includes("://media-next");

export const isBearer = url => [isFeedNext, isCommunication, isPartners, isDare, isMediaNext].some(fn => fn(url));

export const loadFeeds = options => get(`${FEED_NEXT_STG}/feeds/feedsByUserId?`, options);
export const loadDares = options => get(`${DARE_STG}/dares?`, options);

// Registration APIs
export const authentication = options => post(`${BASE_URL_AUTHENTICATION}/registration/authentication`, options);
export const otpVerify = options => post(`${BASE_URL_AUTHENTICATION}/registration/otp-verification`, options)
export const aliasInput = (options) => post(`${BASE_URL_CORE_STG}/registration/alias`, options)
export const birthDateRegistration = (options) => post(`${BASE_URL_CORE_STG}/registration/extended-signup-birthdate`, options);
export const genderCountryRegistration = (options) => post(`${BASE_URL_CORE_STG}/registration/extended-signup-personalInfo`, options);
export const countriesList = () => get(`${BASE_URL_CORE_STG}/Countries`);

// Create Dare APIs
export const sportsList = (options) => get(`${BASE_URL_CORE_STG}/Hashtags?`, options);
export const skillsGroups = () => get(`${BASE_URL_CORE_STG}/SkillGroups`);
export const skillsList = (options) => get(`${BASE_URL_CORE_STG}/Skills?`, options);
export const getEntityId = (options) => get(`${BASE_URL_CORE_STG}/Profiles/detailsByUserAlias${queryString(options)}`);
export const competitorList = (id, options) => get(`${BASE_URL_CORE_STG}/CustomerDetails/${id}/connections?${queryString(options)}`);
export const suggestionList = (options) => get(`${BASE_URL_CORE_STG}/Searches/globalSearch?${queryString(options)}`);
export const hashtagList = () => get(`${BASE_URL_CORE_STG}/Hashtags`);
export const createDare = params => post(`${DARE_STG}/dares`, params);
export const createFeed = params => post(`${FEED_NEXT_STG}/feeds`, params);

//Upload Video APIs with create dare
export const lensGroup = () => get(`${BASE_URL_CORE_STG}/LensGroups/findGroup`);
export const getSignedURL = () => get(`${BASE_URL_SIGNED_URL}/videos/get-signed-url`);
export const postVideo = async (url, formData, videoUploadStatusCallBack, onUploadProgress) => {
  try {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.upload.onprogress = function(e) {
      onUploadProgress.apply(this,[e])
    };
    xhr.send(formData);
    xhr.onreadystatechange = e => {
      if (xhr.readyState == 4 && xhr.status == 204) {
        returned_data = xhr.status;
        //fire your callback function
        videoUploadStatusCallBack.apply(this,[returned_data]);
      } else {

      }
    };
  }
  catch (error) {
      console.log('error : ' + error);
      return error;
  }
};
export const uploadVideoMediaAPI = data => post(`${BASE_URL_MEDIA_STG}/Videos`, data);


const post = async (url, param) => {
  let FetchURL = url;
  const token = getData('token');
  const authHeader = {};
  if (token) {
    authHeader.authorization = isBearer(url) ? `Bearer ${token}` : token;
  }
  console.log("Body params ", param);
  const headers = {
    headers: {...{
      'Content-Type': 'application/json',
      fmsvisitorid: undefined,
    }, ...authHeader},
    method: 'POST',
    body: JSON.stringify(param)
  };

  try {
    console.log("FetchURL, headers ", FetchURL + " "+ JSON.stringify(headers));
    const response = await fetch(FetchURL, headers);
    return await response.json();
  }
  catch (error) {
      console.log('error : ' + error);
      return error;
  }
}

const get = async (url, options = '') => {
  let FetchURL = url;
  
  if(options) {
    const queryParams = new URLSearchParams(options);
    FetchURL = FetchURL+queryParams;
  }

  const token = getData('token');
  const authHeader = {};
  if (token) {
    authHeader.authorization = isBearer(url) ? `Bearer ${token}` : token;
  }
  const headers = {
    headers: {...{
      'Content-Type': 'application/json',
      fmsvisitorid: undefined,
    }, ...authHeader},
    method: 'GET',
    // Cache: 'no-cache'
  };

  try {
    // console.log('Fetch URL and Headers : ' + FetchURL + " " + JSON.stringify(headers));
    const response = await fetch(FetchURL, headers);
    return await response.json();
  }
  catch (error) {
      console.log('error : ' + error);
      return error;
  }
}