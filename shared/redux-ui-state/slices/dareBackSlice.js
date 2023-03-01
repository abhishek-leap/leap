import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  darBackshow: false,
  secondStepShow: false,
  hashtagShow: false,
  selectedPostItem: '',
  hashtags: [],
  videoURI: '',
  videoThumbnailImg: '',
  progressStatus: 0,
  progressBarShow: false,
  progressBarSuccess: false,
};

export const dareBackSlice = createSlice({
  name: 'dareBack',
  initialState,
  reducers: {
    progressBarUpdate: (state, param) => {
      const { payload } = param;
      state.progressStatus = payload;
    },
    progressBarDisplay: (state, param) => {
      const { payload } = param;
      state.progressBarShow = payload;
    },
    progressBarStatus: (state, param) => {
      const { payload } = param;
      state.progressBarSuccess = payload;
    },
    vedioThumbnail: (state, param) => {
      const { payload } = param;
      state.videoThumbnailImg = payload;
    },
    selectedPost: (state, param) => {
      const { payload } = param;
      state.selectedPostItem = payload;
    },
    selectedVedioURI: (state, param) => {
      const { payload } = param;
      state.videoURI = payload;
    },
    selectedHashtags: (state, param) => {
      const { payload } = param;
      if(payload != '') {
          const contains =  state.hashtags.findIndex(v => v.name === payload.name);
          if(contains == -1) {
            state.hashtags.push(payload)
          } else {
            state.hashtags.splice(contains, 1);
          }
      } else {
        state.hashtags.splice(0, state.hashtags.length)
      }
    },
    openDareBackBottomDrawer: state => {
      state.darBackshow = true;
    },
    closeDareBackBottomDrawer: state => {
      state.darBackshow = false;
    },
    openDareBackSecondStepBottomDrawer: state => {
      state.secondStepShow = true;
    },
    closeDareBackSecondStepBottomDrawer: state => {
      state.secondStepShow = false;
    },
    openHastagBottomDrawer: state => {
      state.hashtagShow = true;
    },
    closeHastagBottomDrawer: state => {
      state.hashtagShow = false;
    },
  },
});

// export action creators
export const {selectedPost, openDareBackSecondStepBottomDrawer, closeDareBackSecondStepBottomDrawer, progressBarStatus, progressBarDisplay, vedioThumbnail, progressBarUpdate, selectedVedioURI, selectedHashtags, openDareBackBottomDrawer, closeDareBackBottomDrawer, openHastagBottomDrawer, closeHastagBottomDrawer} =
dareBackSlice.actions;

// export reducer
export default dareBackSlice.reducer;
