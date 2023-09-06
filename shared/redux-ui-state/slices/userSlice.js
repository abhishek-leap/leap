import {createSlice} from '@reduxjs/toolkit';
import {storage} from '../../mmkv-store/store';

const initialState = {
  lang: storage.getString('lang'),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLanguage: (state, param) => {
      const {payload} = param;
      console.log(payload, 'payload');
      state.lang = payload;
    },
  },
});

// export action creators
export const {setLanguage} = userSlice.actions;

// export reducer
export default userSlice.reducer;
