import React, { useCallback } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from '@/core';
import { Router, SafeAreaProvider } from '@/navigation';
import { AppText } from '@/components';
import { colors, sizes } from './styles';

const persistor = persistStore(store);

const CustomFallback = (props: { error: Error; resetError: Function }) => (
  <View style={styles.fallbackContainer}>
    <AppText.Headline1>Oops!</AppText.Headline1>
    <AppText.Subtitle1>{props.error.toString()}</AppText.Subtitle1>
    <Button onPress={() => props.resetError()} title={'Try again'} />
  </View>
);

export const App = () => {
  const errorHandler = useCallback((error: Error, stackTrace: string) => {
    //TODO: send error to sentry or other error tracking service
    console.log('🚀 ~ errorHandler ~ error, stackTrace', { error, stackTrace });
  }, []);

  return (
    <ErrorBoundary onError={errorHandler} FallbackComponent={CustomFallback}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <Router />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.silver,
    paddingHorizontal: sizes.contentMargin.double,
  },
});
