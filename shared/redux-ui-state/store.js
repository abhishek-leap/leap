import {configureStore} from '@reduxjs/toolkit';

// register all reducers here
import authenticationReducer from './slices/authenticationSlice';
import createDareReducer from './slices/createDareSlice';
import dareBackReducer from './slices/dareBackSlice';
import feedsSliceReducer from './slices/feedsSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    createDare: createDareReducer,
    dareBack: dareBackReducer,
    feeds: feedsSliceReducer
  },
});
