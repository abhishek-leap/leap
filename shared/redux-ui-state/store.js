import {configureStore} from '@reduxjs/toolkit';

// register all reducers here
import authenticationReducer from './slices/authenticationSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});
