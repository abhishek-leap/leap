import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  show: false,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    openAuthenticationBottomDrawer: state => {
      state.show = true;
    },
    closeAuthenticationBottomDrawer: state => {
      state.show = false;
    },
  },
});

// export action creators
export const {openAuthenticationBottomDrawer, closeAuthenticationBottomDrawer} =
  authenticationSlice.actions;

// export reducer
export default authenticationSlice.reducer;
