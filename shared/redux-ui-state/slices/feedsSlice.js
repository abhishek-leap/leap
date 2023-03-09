import {createSlice} from '@reduxjs/toolkit';
import {removeElementFromArray} from '../../utils/helper';

const initialState = {
  feedsThreeDotsShow: false,
  feedItem: {},
  reportItemShow: false,
  blockUserShow: false,
  toasterDisplay: false,
  toasterMessage: '',
  blockedUsersList: []
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
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
    }
  },
});

// export action creators
export const { selectedBlockedUsers, removeBlockedUsers, openBlockUsertBottomDrawer, closeBlockUsertBottomDrawer, toasterMessage, toasterDisplayStatus, openReportBottomDrawer, closeReportBottomDrawer, selectedFeedItem, openThreeDotsBottomDrawer, closeThreeDotsBottomDrawer } =
feedsSlice.actions;

// export reducer
export default feedsSlice.reducer;
