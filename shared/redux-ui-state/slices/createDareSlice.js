import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  show: false,
  sportsShow: false,
  skillsShow: false,
  competitorShow: false,
  hashtagShow: false,
  sport: "",
  skills: "",
  competitor: "",
  hashtags: [],
  videoURI: '',
  videoThumbnailImg: '',
  progressStatus: 0,
  progressBarShow: false,
  progressBarSuccess: false,
};

export const createDareSlice = createSlice({
  name: 'createDare',
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
    selectedVedioURI: (state, param) => {
      const { payload } = param;
      state.videoURI = payload;
    },
    selectedSport: (state, param) => {
      const { payload } = param;
      state.sport = payload;
    },
    selectedSkills: (state, param) => {
      const { payload } = param;
      state.skills = payload;
    },
    selectedCompetitor: (state, param) => {
      const { payload } = param;
      state.competitor = payload;
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
    openCreateDareBottomDrawer: state => {
      state.show = true;
    },
    closeCreateDareBottomDrawer: state => {
      state.show = false;
    },
    openSportsBottomDrawer: state => {
      state.sportsShow = true;
    },
    closeSportsBottomDrawer: state => {
      state.sportsShow = false;
    },
    openSkillsBottomDrawer: state => {
      state.skillsShow = true;
    },
    closeSkillsBottomDrawer: state => {
      state.skillsShow = false;
    },
    openCompetitorBottomDrawer: state => {
      state.competitorShow = true;
    },
    closeCompetitorBottomDrawer: state => {
      state.competitorShow = false;
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
export const { progressBarStatus, progressBarDisplay, vedioThumbnail, progressBarUpdate, selectedVedioURI, selectedSport, selectedSkills, selectedCompetitor, selectedHashtags, openSportsBottomDrawer, closeSportsBottomDrawer, openCreateDareBottomDrawer, closeCreateDareBottomDrawer, openSkillsBottomDrawer, closeSkillsBottomDrawer, openCompetitorBottomDrawer, closeCompetitorBottomDrawer, openHastagBottomDrawer, closeHastagBottomDrawer} =
createDareSlice.actions;

// export reducer
export default createDareSlice.reducer;
