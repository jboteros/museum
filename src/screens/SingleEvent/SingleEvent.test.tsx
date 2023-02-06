import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer, SafeAreaProvider } from '@/navigation';
import { SingleEvent } from './SingleEvent';

describe('tests => SingleEvent', () => {
  it('should render SingleEvent', () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <SingleEvent />
        </NavigationContainer>
      </SafeAreaProvider>,
    );
    expect(component).toBeTruthy();
  });
});
