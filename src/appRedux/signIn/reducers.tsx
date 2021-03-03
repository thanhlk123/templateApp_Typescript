import {createSlice} from '@reduxjs/toolkit';
// import * as logoutActions from 'appRedux/signOut/reducers';

const initialState = {
  isLoading: false,
  data: null,
  isSignedIn: false,
  errors: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    postStart: (state) => {
      state.isLoading = true;
      state.isSignedIn = initialState.isSignedIn;
      state.errors = initialState.errors;
    },
    postSuccess: (state, {payload}) => {
      state.isLoading = false;
      state.data = payload;
      state.isSignedIn = true;
    },
    postFailure: (state, {payload}) => {
      state.isLoading = false;
      state.isSignedIn = false;
      state.errors = payload;
    },
    verifyStart: (state) => {
      state.isLoading = true;
      state.isSignedIn = false;
    },
    verifySuccess: (state, {payload}) => {
      state.isLoading = false;
      state.data = payload;
      state.isSignedIn = true;
    },
    verifyFailure: (state) => {
      state.isLoading = false;
      state.isSignedIn = false;
    },
  },
  extraReducers: {
    // [logoutActions.postStart]: (state) => {
    //   state.isLoading = true;
    // },
    // [logoutActions.postSuccess]: (state) => {
    //   state.isLoading = false;
    //   state.data = null;
    //   state.isSignedIn = false;
    // },
  },
});

export const getAccessToken = (state) => state?.data?.accessToken;

export const {
  postStart,
  postSuccess,
  postFailure,
  verifyStart,
  verifySuccess,
  verifyFailure,
} = loginSlice.actions;

export default loginSlice.reducer;
