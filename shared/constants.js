import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const WINDOW_WIDTH = width;
export const WINDOW_HEIGHT = height;
export const SITE_KEY = '6Ld-JYkfAAAAAHDOOVWS4iWciHjsubtVVmEHIKxq';
export const OFFSET_LIMIT = 10;
export const MAX_TOTAL_CONNECTIONS = 50;
export const INITIAL_LOAD_FEED= 4;

export const SIGN_IN_UP_FOR = "Sign in/up for";
export const USE_EMAIL = "USE EMAIL";
export const USE_PHONE = "USE PHONE";
export const WHAT_IS_EMAIL_ADDRESS = 'What is your Email Address?';
export const WHAT_IS_PHONE_NUMBER = 'What is your Phone Number?';
export const WE_SENT_AUTH_CODE = 'We have sent you a authentication code';
export const NEXT = "NEXT";
export const DONE = "DONE";
export const LETS_GO = "Let's Go";
export const PLACEHOLDER_EMAIL_ADDRESS = "Type email address";
export const PLACEHOLDER_PHONE_NUMBER = "Type phone number";
export const TO_PHONE_NUMBER = "To a phone number ";
export const TO_EMAIL_ADDRESS = "To an email address ";
export const DID_NOT_RECEIVE_CODE = "Did not receive a code?";
export const SEND_AGAIN = "Send again";
export const SIGN_IN_UP = "Sign in/up";
export const DEFAULT_HASH_TAGS_COUNTOSHOW= 2;
export const ACTIVE_DARE_STATUS = "active";
export const CLOSED_STATUS = "completed";
export const KNOW_YOU_BETTER = "Let's get to know you better";
export const NICKNAME = "Nickname";
export const ERROR_EMAIL_FORMAT = "Please provide a valid email address eg. user@server.com";
export const ERROR_PHONE_FORMAT = "Please provide a valid phone number";
export const WHAT_IS_YOUR_BIRTHDAY = 'What is your birthday?';
export const WE_ARE_ALMOST_DONE = "We're almost done";
export const CREATE_DARE = "Create Dare";
export const DARE_BACK = "Dare Back";
export const PLACEHOLDER_SPORTS = "Sport (#Soccer)";
export const PLACEHOLDER_SKILLS = "Skills *";
export const PLACEHOLDER_COMPETITOR = "Competitor";
export const PLACEHOLDER_HASHTAGS = "Hashtags";
export const PLACEHOLDER_DARE_TITLE = "Dare Title *";
export const PLACEHOLDER_SEARCH = "Search";
export const PLACEHOLDER_COMMENT = "Add a comment";
export const SELECT_FROM_GALLERY = "You can select a frame from the video or an image from the gallery";
export const UPLOAD_BROWSE_TYPE = {
    VIDEO: "video",
    PHOTO: "photo",
    LINK: "link",
    LOCATION: "location"
};

export const USER_TYPE = {
  CREATOR: "creator",
  COMPETITOR: "competitor",
};

export const ROLE_TYPE = {
  PLAYERS: "players",
}

export const ENTITY = {
  CUSTOMER: "Customer",
}

export const LIST_TYPE = {
  CONNECTION: "connections",
  FOLLOWING: "following",
  FOLLOWERS: "followers"
}

export const DARE_STATE = {
  PREVIEW: "preview",
  PLAY_MODE: "play-mode",
  FIRST_ASSET: "video1",
  SECOND_ASSET: "video2",
  VOTE: "vote",
  RESULT: "result",
};

export const HEADER_DARE_BACK_SUBTITLE = "Head to Head Battle";
export const HEADER_DARE_BACK_DETAILS = "Choose from your uploaded battle";
export const UPLOAD_NEW = "Upload new";
export const UPLOAD_FOR_BATTLE = "for this battle";
export const BUTTON_START_BATTLE = "Start Battle";
