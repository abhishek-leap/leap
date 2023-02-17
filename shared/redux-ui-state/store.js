import {configureStore} from '@reduxjs/toolkit';

// register all reducers here
import authenticationReducer from './slices/authenticationSlice';
import createDareReducer from './slices/createDareSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    createDare: createDareReducer
  },
});
