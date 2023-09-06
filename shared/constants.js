import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const WINDOW_WIDTH = width;
export const WINDOW_HEIGHT = height;
export const SITE_KEY = '6Ld-JYkfAAAAAHDOOVWS4iWciHjsubtVVmEHIKxq';
export const OFFSET_LIMIT = 10;
export const MAX_TOTAL_CONNECTIONS = 50;
export const INITIAL_LOAD_FEED = 4;
export const BOTTOM_BAR_HEIGHT = 70;
export const HEADER_HEIGHT = 40;
export const DARE_BAR_HEIGHT = 90;
export const TALENTS_PER_PAGE = 10;
export const FEEDS_TO_FETCH = 10;

export const BLOCK_ACTION = 'block';
export const CLOSED = 'closed';
export const NEW = 'new';
export const SIGN_IN_UP_FOR = 'Sign in/up for';
export const USE_EMAIL = 'USE EMAIL';
export const USE_PHONE = 'USE PHONE';
export const WHAT_IS_EMAIL_ADDRESS = 'What is your Email Address?';
export const WHAT_IS_PHONE_NUMBER = 'What is your Phone Number?';
export const WE_SENT_AUTH_CODE = 'We have sent you a authentication code';
export const NEXT = 'NEXT';
export const DONE = 'DONE';
export const LETS_GO = "Let's Go";
export const PLACEHOLDER_EMAIL_ADDRESS = 'Type email address';
export const PLACEHOLDER_PHONE_NUMBER = 'Type phone number';
export const TO_PHONE_NUMBER = 'To a phone number ';
export const TO_EMAIL_ADDRESS = 'To an email address ';
export const DID_NOT_RECEIVE_CODE = 'Did not receive a code?';
export const SEND_AGAIN = 'Send again';
export const SIGN_IN_UP = 'Sign in/up';
export const DEFAULT_HASH_TAGS_COUNTOSHOW = 2;
export const ACTIVE_DARE_STATUS = 'active';
export const CLOSED_STATUS = 'completed';
export const KNOW_YOU_BETTER = "Let's get to know you better";
export const NICKNAME = 'Nickname';
export const ERROR_EMAIL_FORMAT = 'Please provide a valid email address';
export const ERROR_PHONE_FORMAT = 'Please provide a valid phone number';
export const WHAT_IS_YOUR_BIRTHDAY = 'What is your birthday?';
export const WE_ARE_ALMOST_DONE = "We're almost done";
export const CREATE_DARE = 'Create Dare';
export const DARE_BACK = 'Dare Back';
export const PLACEHOLDER_SPORTS = 'Sport (#Soccer)';
export const PLACEHOLDER_SKILLS = 'Skills *';
export const PLACEHOLDER_COMPETITOR = 'Competitor';
export const PLACEHOLDER_HASHTAGS = 'Hashtags';
export const PLACEHOLDER_DARE_TITLE = 'Dare Title *';
export const PLACEHOLDER_SEARCH = 'Search';
export const PLACEHOLDER_COMMENT = 'Add a comment';
export const SELECT_FROM_GALLERY =
  'You can select a frame from the video or an image from the gallery';
export const UPLOAD_BROWSE_TYPE = {
  VIDEO: 'video',
  PHOTO: 'photo',
  LINK: 'link',
  LOCATION: 'location',
};

export const USER_TYPE = {
  CREATOR: 'creator',
  COMPETITOR: 'competitor',
};

export const ROLE_TYPE = {
  PLAYERS: 'players',
};

export const ENTITY = {
  CUSTOMER: 'Customer',
};

export const LIST_TYPE = {
  CONNECTION: 'connections',
  FOLLOWING: 'following',
  FOLLOWERS: 'followers',
};

export const DARE_STATE = {
  PREVIEW: 'preview',
  PLAY_MODE: 'play-mode',
  FIRST_ASSET: 'video1',
  SECOND_ASSET: 'video2',
  VOTE: 'vote',
  RESULT: 'result',
};

export const TALENT_USER_FILTERS_OBJ = {
  community: {
    label: 'Community Blocked',
    value: 'community',
    queryKey: 'filter',
  },
  power: {label: 'SU Blocked', value: 'power', queryKey: 'filter'},
};

export const HEADER_DARE_BACK_SUBTITLE = 'Head to Head Battle';
export const HEADER_DARE_BACK_DETAILS = 'Choose from your uploaded battle';
export const UPLOAD_NEW = 'Upload new';
export const UPLOAD_FOR_BATTLE = 'for this battle';
export const BUTTON_START_BATTLE = 'Start Battle';
export const enabledLanguages = [
  'en',
  'ru',
  'fr',
  'es',
  'zh',
  'ar',
  'id',
  'de',
  'it',
  'pt',
  'ja',
  'tr',
  'ca',
  'el',
  'nl',
  'jv',
  'ko',
  'he',
  'hr',
  'uk',
];

export const formattedMessages = {
  new: 'new',
  closed: 'Closed',
  next: 'Next',
  tapToSkip: 'One tap to skip',
  more: 'More',
  less: 'less',
  showAll: 'Show All',
  earlier: 'Earlier',
  unread: 'Unread',
  theCompetitor: 'the Competitor',
  approvedYourDARE: 'approved Your DARE',
  chooseToCompeteWithYou: 'choose to compete with you',
  youHaveAnewMatchforBattle: 'You have a new match for Battle',
  getReady: 'get Ready',
  yourBattleHasJustStarted: 'your Battle has just started',
  yourVideoWillBeAvailableForVotingSoon:
    'your video will be available for voting soon',
  congratulations: 'Congratulations',
  youVotedFor: 'You voted for',
  and: 'and',
  heWon: 'he won',
  wonTheBattleAgainst: 'won the battle against',
  commentedOnYourPost: 'commented on your post',
  youHave: 'You have',
  comments: 'comments',
  likes: 'likes',
  likedYourPost: 'liked your post',
  justCommentedOnYour: 'just commented on your post',
  hey: 'Hey',
  justUploadedAnewVideo: 'just uploaded a new video',
  letsGoCheckItOut: "Let's go check it out!",
  greatNews: 'Great news!',
  someone: 'Someone',
  yourProfile: 'your profile',
  invalidContent:
    'Oops, it looks like the content you uploaded is not valid. Please upload a new one',
  other: 'other',
  others: 'others',
  replied: 'replied',
  just: 'just',
  You: 'You',
  yourPost: 'Your post',
  goodluck: 'Good luck!',
  isNowLive: 'is now live',
  yourBattleAgainst: 'Your battle against',
  theBattleBetween: 'The battle between',
  hasStarted: 'has started',
  whoWillWin: 'Who will win?',
  waitingForCompetitor: "We're now waiting for your competitor's response",
  contentApproved: 'Your content has been approved',
  toStartTheBattle: 'to start the battle',
  hasAcceptedYourDare: 'has accepted your dare',
  yourDare: 'Your dare',
  isUnblocked: 'is unblocked',
  wonTheBattle: 'won the battle',
  letsTryAgain: "Let's try again!",
  unfortunately: 'Unfortunately',
  refusedTheChallenge: 'has refused the challenge',
  letsInviteSomeoneElse: "Let's invite someone else",
  hasCanceledTheChallenge: 'has canceled the challenge',
  betterLuckNextTime: 'Better luck next time!',
  youInvited: "You've been invited by",
  toAbattle: 'to a battle',
  letsGoToDareCenter: "Let's go to the Dare center to check it out!",
  aboutToClose: 'is about to be closed',
  lastCall: 'Last call!',
  lastChanceToVote: 'Last chance to vote on',
  hurryUp: 'Hurry up!',
  seeMore: 'see more',
  viewed: 'viewed',
  yourBattle: 'your Battle',
  votedOn: 'voted on',
  youVotedForTheWinner: 'You voted for the winner',
  followingYou: 'just started following you',
  connection: 'No notifications',
  noComments: 'There are no comments',
  sharingWillBeAvailable: 'Sharing will be available in next version',
  itsSpam: 'Its spam',
  nudityOrSexualActivity: 'Nudity or sexual activity',
  hateSpeech: 'Hate Speech or symbols',
  harassment: 'Harassment',
  suicide: 'Sucide',
  scam: 'Scam',
  falseInfo: 'False information',
  justDontLikeIt: 'I just dont like it',
  somethingWentWrong: 'Oops, Something Went Wrong!',
  pleaseSelectAreport: 'Please select a report!',
  thanksForReport: 'Thanks for report!',
  abuseReport: 'abuse report',
  letsGo: "Let's go",
  videoWillOpenForOthers: 'This video will open for others to dare you back!',
  competitorAdded: 'Competitor added successfully!',
  createDare: 'Create Dare',
  startBattle: 'Start Battle',
  chooseFromUploadedBattle: 'Choose from your uploaded battle',
  headToHeadBattle: 'Head to Head Battle',
  youHaventCreatedAnyPost:
    "Looks like you haven't created any post. Create a dare by clicking on button below.",
  viewProfile: 'View Profile',
  report: 'Report',
  delete: 'Delete',
  post: 'Post',
  user: 'User',
  block: 'Block',
  cancel: 'Cancel',
  youBlockedTheUser:
    "They won't be able to find your profile, posts or Dares on Leap. Leap won't let them know you blocked them.",
  userNoLongerExists: 'Sorry, this user no longer exists!',
  ok: 'OK',
  openLeap: 'OPEN LEAP',
  enjoyApp: 'Enjoy the experience of using the app',
  uploadSuccessful: 'Success! Your upload was successful.',
  dareCreated: 'Dare created successfully!',
  postCreated: 'Post created successfully!',
  yourContentRemoved:
    "Your content has been removed as it doesn't meet the requirements.",
  yourContentUnblocked: 'Your content has been evaluated and is now unblocked.',
  yourProfileBlocked:
    'Your profile has been blocked due to non-compliance with our policy.',
  yourProfileUnblocked: 'Your profile has been evaluated and is now unblocked.',
  selectImage:
    'You can select a frame from the video or an image from the gallery',
  cover: 'Cover',
  views: 'views',
  viewedYourProfile: 'just viewed your profile.',
  youCanSelectAFrame:
    'You can select a frame from the video or an image from the gallery',
  competitor: 'Competitor',
  dareTitle: 'Dare Title',
  sport: 'Sport (#Soccer)',
  hashtags: 'Hashtags',
  competitors: 'Competitors',
  suggested: 'Suggested',
  skills: 'Skills',
  search: 'Search',
  agility: 'Agility',
  Power: 'Power',
  Speed: 'Speed',
  Coordination: 'Coordination',
  Technique: 'Technique',
  Freestyle: 'Freestyle',
  Reaction_time: 'Reaction time',
  following: 'Following',
  follow: 'follow',
  dares: 'Dares',
  CONGRATULATIONS: 'CONGRATULATIONS!',
  GOOD_LUCK: 'GOOD LUCK!',
  YOU_WON: 'YOU WON',
  WON: 'WON',
  YOU_VOTED_CORRECTLY: 'YOU VOTED CORRECTLY',
  GET_READY: 'GET READY!',
  reply: 'reply',
  blockuser: 'Block User',
  blockPost: 'Block Post',
  unblockUser: 'Unblock User',
  unblockPost: 'Unblock Post',
  forThisBattle: 'for this Battle',
  upload: 'Upload',
  errorOccured: 'Please try again, some error occured!',
  addComment: 'Add a Comment',
  years: 'y',
  months: 'm',
  weeks: 'w',
  days: 'd',
  hours: 'h',
  min: 'm',
  seconds: 's',
  videoDelete: 'Video removed successfully',
  secs: 'secs',
  videoDurationExceeds: 'Video duration must not exceeds',
  reviewingYourPost: "We're reviewing your post.",
  hangTight: 'Hang tight!',
  nextTime: 'Maybe next time',
  youLose: 'You Lose!',
  you: 'you',
  won: 'won!',
  tryUploadAgain: '1. Check and try uploading again',
  contactSupport: '2. Contact support',
  problemWithVideo: 'There is a problem with your video',
  requestUnderProcess:
    'Your request is under process and will be available shortly.',
  playerConfirm: 'Let the player confirm your order',
  refused: 'Refused',
  dare_canceled: 'Canceled',
  refuse: 'refuse',
  addCompetitor: 'add competitor',
  dareBack: 'DARE BACK',
  followers: 'Followers',
  unfollow: 'unfollow',
  info: 'info',
  posts: 'Posts',
  accountSettings: 'Account Settings',
  edit: 'Edit',
  nickname: 'Nickname',
  email: 'Email',
  phone: 'Phone',
  personalInfo: 'Personal Info',
  leapPosition: 'LEAP Position',
  player: 'Player',
  gender: 'Gender',
  age: 'Age',
  height: 'Height',
  weight: 'Weight',
  position: 'Position',
  foot: 'Foot',
  statistics: 'Statistics',
  logout: 'Logout',
  deleteAccount: 'Delete Account',
  userId: 'User ID',
  blockUser: 'Block User',
  male: 'male',
  female: 'female',
  yes: 'Yes',
  no: 'No',
  youWantToDeleteAccount: 'Are you sure, you want to delete your account?',
  filters: 'Filters',
  pleaseSelect: 'Please select',
  apply: 'Apply',
  communityBlocked: 'Community Blocked',
  superUserBlocked: 'SU Blocked',
  items: 'items',
};
