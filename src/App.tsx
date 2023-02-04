import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import { store } from '@/core';
import { Router, SafeAreaProvider } from '@/navigation';

const persistor = persistStore(store);

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Router />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};
