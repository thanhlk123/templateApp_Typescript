import {combineReducers} from '@reduxjs/toolkit';
import {combineEpics} from 'redux-observable';
import login from './signIn/reducers';

import loginEpic from './signIn/epics';

export const rootReducer = combineReducers({
  login,
});

export const rootEpic = combineEpics(loginEpic);
