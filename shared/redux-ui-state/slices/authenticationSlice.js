import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  show: false,
  genderShow: false,
  countryShow: false,
  genderName: "",
  countryName: "",
  authStatus: 0
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    FullAuthentication: (state, param) => {
      const { payload } = param;
      state.authStatus = payload;
    },
    selectedGender: (state, param) => {
      const { payload } = param;
      state.genderName = payload;
    },
    selectedCountry: (state, param) => {
      const { payload } = param;
      state.countryName = payload;
    },
    openAuthenticationBottomDrawer: state => {
      state.show = true;
    },
    closeAuthenticationBottomDrawer: state => {
      state.show = false;
    },
    openGenderBottomDrawer: state => {
      state.genderShow = true;
    },
    closeGenderBottomDrawer: state => {
      state.genderShow = false;
    },
    openCountryBottomDrawer: state => {
      state.countryShow = true;
    },
    closeCountryBottomDrawer: state => {
      state.countryShow = false;
    },
  },
});

// export action creators
export const { FullAuthentication, selectedGender, selectedCountry, openAuthenticationBottomDrawer, closeAuthenticationBottomDrawer, openGenderBottomDrawer, closeGenderBottomDrawer, openCountryBottomDrawer, closeCountryBottomDrawer} =
  authenticationSlice.actions;

// export reducer
export default authenticationSlice.reducer;
