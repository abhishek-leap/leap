import {createSlice} from '@reduxjs/toolkit';
import {removeElementFromArray} from '../../utils/helper';

const initialState = {
  dareBarHeight: 0,
  feedsThreeDotsShow: false,
  feedItem: {},
  reportItemShow: false,
  blockUserShow: false,
  toasterDisplay: false,
  toasterMessage: '',
  blockedUsersList: [],
  commentUIShow: false,
  notificationUIShow: false,
  feeds: []
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    selectedFeeds: (state, param) => {
      const { payload } = param;
      state.feeds = payload;
    },
    selectedFeedItem: (state, param) => {
      const { payload } = param;
      state.feedItem = payload;
    },
    selectedBlockedUsers: (state, param) => {
      const { payload } = param;
      state.blockedUsersList.push(payload);
    },
    removeBlockedUsers: (state, param) => {
      const { payload } = param;
      state.blockedUsersList = removeElementFromArray(state.blockedUsersList, n => n === payload);
    },
    dareBarView: (state, param) => {
      const { payload } = param;
      state.dareBarHeight = payload;
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
      const { payload } = param;
      state.toasterMessage = payload;
    },
    toasterDisplayStatus: (state, param) => {
      const { payload } = param;
      state.toasterDisplay = payload;
    },
    openCommentUItBottomDrawer: state => {
      state.commentUIShow = true;
    },
    closeCommentUItBottomDrawer: state => {
      state.commentUIShow = false;
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
export const { dareBarView, selectedFeeds, openNotificationBottomDrawer, closeNotificationBottomDrawer, openCommentUItBottomDrawer, closeCommentUItBottomDrawer, selectedBlockedUsers, removeBlockedUsers, openBlockUsertBottomDrawer, closeBlockUsertBottomDrawer, toasterMessage, toasterDisplayStatus, openReportBottomDrawer, closeReportBottomDrawer, selectedFeedItem, openThreeDotsBottomDrawer, closeThreeDotsBottomDrawer } =
feedsSlice.actions;

// export reducer
export default feedsSlice.reducer;
