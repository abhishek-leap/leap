const MEDIA_PROD = 'https://media.playleap.io/v1';
const MEDIA_STG = 'https://mediastg.playleap.io/v1';

export const IsProductionAPIs = process.env.REACT_APP_ENV === 'production';
export const MEDIA = IsProductionAPIs ? MEDIA_PROD : MEDIA_STG;

export const AVATAR_ID = 'avatarId';
export const FEED_STG = 'https://feedstg.playleap.io/v1';
export const FEED_NEXT_STG = 'https://feed-nextstg.playleap.io';
export const DARE_STG = 'https://darestg.playleap.io';
export const BASE_URL_AUTHENTICATION = 'https://authstg.playleap.io/v1';
export const CORE_PROD = 'https://core.playleap.io/v1';
export const BASE_URL_CORE_STG = 'https://corestg.playleap.io/v1';
export const BASE_URL_SIGNED_URL = 'https://media-nextstg.playleap.io';
export const TEMP_CDN_VIDEO = 'https://d344om1kzciot1.cloudfront.net/';
export const BASE_URL_MEDIA_STG = 'https://mediastg.playleap.io/v1';
const NOTIFICATION_PROD = 'https://notification.playleap.io/v1';
const NOTIFICATION_STG = 'https://notification-nextstg.playleap.io';
export const NOTIFICATION = IsProductionAPIs
  ? NOTIFICATION_PROD
  : NOTIFICATION_STG;
const BASE_STG_URL_SITE = 'https://appstg.playleap.io';
const BASE_PROD_URL_SITE = 'https://app.playleap.io';
export const BASE_URL_SITE = IsProductionAPIs
  ? BASE_PROD_URL_SITE
  : BASE_STG_URL_SITE;
export const CORE = IsProductionAPIs ? CORE_PROD : BASE_URL_CORE_STG;
