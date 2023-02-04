import React, { useCallback } from 'react';
import Carousel from 'react-native-snap-carousel';
import { sizes } from '@/styles';
import { NavigationProps, routeNames, useNavigation } from '@/navigation';
import { EventProps } from '@/core/museum/types';
import { CarouselItem } from './CarouselItem';
import { useStore } from './useStore';

export const SCALE_FACTOR_WIDTH = 0.6;
export const SCALE_FACTOR_HEIGHT = 0.8;

export const EventsCarrousel = () => {
  const navigation = useNavigation<NavigationProps>();
  const { events = [] } = useStore();

  const handleSelectEvent = useCallback(
    (event: EventProps) =>
      navigation.navigate(routeNames.SINGLE_EVENT, { id: event.id }),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: EventProps }) =>
      CarouselItem({ item, onSelect: () => handleSelectEvent(item) }),
    [handleSelectEvent],
  );

  return (
    <Carousel
      testID="eventsCarrousel"
      firstItem={0}
      loop
      loopClonesPerSide={3}
      activeSlideAlignment={'start'}
      inactiveSlideScale={1.0}
      inactiveSlideOpacity={1.0}
      data={events}
      renderItem={renderItem}
      sliderWidth={sizes.deviceWidth}
      itemWidth={sizes.deviceWidth * SCALE_FACTOR_WIDTH}
      sliderHeight={sizes.deviceWidth * SCALE_FACTOR_WIDTH}
      itemHeight={sizes.deviceWidth * SCALE_FACTOR_HEIGHT}
    />
  );
};
