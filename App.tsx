/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@appRedux/configureStore';
import ApplicationContainer from '/ApplicationContainer';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationContainer />
      </PersistGate>
    </Provider>
  );
};

export default App;
