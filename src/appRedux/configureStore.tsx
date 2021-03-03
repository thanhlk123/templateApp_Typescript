import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

import {createEpicMiddleware} from 'redux-observable';
import logger from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';

import {rootReducer, rootEpic} from './root';

const epicMiddleware = createEpicMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
  timeout: 100000,
};

const triggerErrorMiddleware = (store) => (next) => (action) => {
  if (action?.payload?.errors) {
    next(action);
    Toast.show(action.payload.msg);
    if (
      store.getState()?.login?.isSignedIn &&
      action?.payload?.status === 401
    ) {
      // store.dispatch(loginActions.logoutStart());
    }
  } else {
    next(action);
  }
};

const middleware = [
  ...getDefaultMiddleware({
    thunk: false,
    immutableCheck: false,
    serializableCheck: false,
  }),
  epicMiddleware,
  triggerErrorMiddleware,
];

if (__DEV__) {
  middleware.push(logger);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

epicMiddleware.run(rootEpic);

const persistor = persistStore(store);

export {store, persistor};
