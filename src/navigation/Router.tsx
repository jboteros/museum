import React from 'react';
import {
  createStackNavigator,
  NavigationContainer,
  routeNames,
  RootStackParamList,
  createNavigationContainerRef,
} from './index';
import {
  HomeScreen,
  SingleEvent,
  SingleArtwork,
  ImageViewerModal,
} from '@/screens/';

export const Router = () => {
  const RootStack = createStackNavigator<RootStackParamList>();

  const navigationRef = createNavigationContainerRef<RootStackParamList>();

  return (
    <NavigationContainer ref={navigationRef}>
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
          <RootStack.Screen
            name={routeNames.SINGLE_ARTWORK}
            component={SingleArtwork}
            options={{
              animationEnabled: true,
              headerShown: false,
            }}
          />
        </RootStack.Group>
        <RootStack.Group
          screenOptions={{
            presentation: 'modal',
          }}>
          <RootStack.Screen
            name={routeNames.IMAGE_VIEWER}
            component={ImageViewerModal}
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
