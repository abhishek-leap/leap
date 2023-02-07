const MEDIA_PROD = "https://media.playleap.io/v1";
const MEDIA_STG = "https://mediastg.playleap.io/v1";

export const IsProductionAPIs = process.env.REACT_APP_ENV === "production";
export const AVATAR_ID = "avatarId";
export const FEED_STG = 'https://feedstg.playleap.io/v1';
export const DARE_STG = "https://darestg.playleap.io";
export const MEDIA = IsProductionAPIs ? MEDIA_PROD : MEDIA_STG;
export const BASE_URL_AUTHENTICATION = "https://authstg.playleap.io/v1";
export const BASE_URL_CORE_STG = "https://corestg.playleap.io/v1";
