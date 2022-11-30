import {FEED_STG,DARE_STG} from './urls';

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
