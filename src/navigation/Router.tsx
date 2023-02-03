import React from 'react';
import {
  NavigationContainer,
  routeNames,
  createStackNavigator,
  RootStackParamList,
} from './index';
import { HomeScreen, SingleEvent } from '@/screens/';

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
        <RootStack.Group
          screenOptions={{
            presentation: 'card',
          }}>
          <RootStack.Screen
            name={routeNames.SINGLE_EVENT}
            component={SingleEvent}
            options={{
              animationEnabled: true,
              headerShown: false,
            }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
