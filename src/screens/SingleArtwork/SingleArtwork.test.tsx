import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer, SafeAreaProvider } from '@/navigation';
import { SingleArtwork } from './SingleArtwork';

describe('tests => SingleArtwork', () => {
  it('should render SingleArtwork', () => {
    const component = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <SingleArtwork />
        </NavigationContainer>
      </SafeAreaProvider>,
    );
    expect(component).toBeTruthy();
  });
});
