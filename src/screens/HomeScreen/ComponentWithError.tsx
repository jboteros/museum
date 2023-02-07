import React, { useEffect } from 'react';
import { View } from 'react-native';
import { AppText } from '@/components';

export const ComponentWithError = () => {
  useEffect(() => {
    throw new Error(
      'Developer Error 💥😵🚨, This is a test error thrown by ComponentWithError testing the Error Boundary System .',
    );
  }, []);

  return (
    <View>
      <AppText>ComponentWithError</AppText>
    </View>
  );
};
