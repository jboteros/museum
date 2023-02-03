import React from 'react';
import {
  NavigationContainer,
  routeNames,
  createStackNavigator,
  RootStackParamList,
} from './index';
import { HomeScreen } from '@/screens/';

export const Router = () => {
  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name={routeNames.HOME_SCREEN}
          component={HomeScreen}
          options={{
            animationEnabled: false,
            headerShown: false,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
