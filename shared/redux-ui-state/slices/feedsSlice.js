import {createSlice} from '@reduxjs/toolkit';
import {removeElementFromArray} from '../../utils/helper';
import {Platform} from 'react-native';

const initialState = {
  feedsThreeDotsShow: false,
  feedItem: {},
  reportItemShow: false,
  blockUserShow: false,
  toasterDisplay: false,
  toasterMessage: '',
  blockedUsersList: [],
  notificationUIShow: false,
  feeds: [],
  firstFeedLoaded: false,
  audioOn: Platform.OS !== 'web',
  searchText: '',
  feedPlayerModalId: '',
  feedSource: '',
  feedSlug: '',
  feedCommentsModalId: '',
  feedIdMenuOptions: '',
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    setAudioOn: state => {
      state.audioOn = true;
    },
    setAudioOff: state => {
      state.audioOn = false;
    },
    firstFeedLoaded: (state, param) => {
      state.firstFeedLoaded = true;
    },
    selectedFeedItem: (state, param) => {
      const {payload} = param;
      state.feedItem = payload;
    },
    selectedBlockedUsers: (state, param) => {
      const {payload} = param;
      state.blockedUsersList.push(payload);
    },
    removeBlockedUsers: (state, param) => {
      const {payload} = param;
      state.blockedUsersList = removeElementFromArray(
        state.blockedUsersList,
        n => n === payload,
      );
    },
    searchScreenText: (state, param) => {
      const {payload} = param;
      state.searchText = payload;
    },
    openThreeDotsBottomDrawer: state => {
      state.feedsThreeDotsShow = true;
    },
    closeThreeDotsBottomDrawer: state => {
      state.feedsThreeDotsShow = false;
    },
    openReportBottomDrawer: state => {
      state.reportItemShow = true;
    },
    closeReportBottomDrawer: state => {
      state.reportItemShow = false;
    },
    openBlockUsertBottomDrawer: state => {
      state.blockUserShow = true;
    },
    closeBlockUsertBottomDrawer: state => {
      state.blockUserShow = false;
    },
    toasterMessage: (state, param) => {
      const {payload} = param;
      state.toasterMessage = payload;
    },
    toasterDisplayStatus: (state, param) => {
      const {payload} = param;
      state.toasterDisplay = payload;
    },
    openCommentUItBottomDrawer: (state, action) => {
      state.feedCommentsModalId = action.payload;
    },
    closeCommentUItBottomDrawer: state => {
      state.feedCommentsModalId = '';
    },
    openNotificationBottomDrawer: state => {
      state.notificationUIShow = true;
    },
    closeNotificationBottomDrawer: state => {
      state.notificationUIShow = false;
    },
  },
});

// export action creators
export const {
  searchScreenText,
  setAudioOn,
  setAudioOff,
  firstFeedLoaded,
  openNotificationBottomDrawer,
  closeNotificationBottomDrawer,
  openCommentUItBottomDrawer,
  closeCommentUItBottomDrawer,
  selectedBlockedUsers,
  removeBlockedUsers,
  openBlockUsertBottomDrawer,
  closeBlockUsertBottomDrawer,
  toasterMessage,
  toasterDisplayStatus,
  openReportBottomDrawer,
  closeReportBottomDrawer,
  selectedFeedItem,
  openThreeDotsBottomDrawer,
  closeThreeDotsBottomDrawer,
} = feedsSlice.actions;

// export reducer
export default feedsSlice.reducer;
