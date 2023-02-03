import React, { useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { format } from 'date-fns';
import Carousel from 'react-native-snap-carousel';
import { Event } from '@/core/museum/types';

import { useAppSelector } from '@/core';

import { colors, sizes } from '@/styles';
import { AppText, SeparateChildren } from '@/components';

const SCALE_FACTOR_WIDTH = 0.6;
const SCALE_FACTOR_HEIGHT = 0.8;

const _renderItem = ({ item }: { item?: Event }) => {
  if (!item) {
    return null;
  }

  return (
    <TouchableOpacity
      key={item.id}
      style={{
        height: sizes.deviceWidth * SCALE_FACTOR_HEIGHT,
        padding: 5,
        borderRadius: 10,
        overflow: 'hidden',
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        resizeMode="cover"
        source={{ uri: item.image_url }}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={{
          position: 'absolute',
          paddingHorizontal: sizes.contentMargin.full,
          paddingVertical: sizes.contentMargin.half,
          width: '100%',
          bottom: sizes.contentMargin.half,
          borderRadius: sizes.borderRadius.medium,
          backgroundColor: colors.alphaColor(colors.white, 0.8),
          justifyContent: 'space-around',
        }}>
        <SeparateChildren Separator={() => <View style={{ height: 8 }} />}>
          <AppText.Subtitle2 numberOfLines={2}>{item.title}</AppText.Subtitle2>
          <AppText.Body1
            style={{ color: colors.alphaColor(colors.black, 0.8) }}>
            {item.location}
          </AppText.Body1>
          <AppText.Overline2
            style={{
              alignSelf: 'flex-end',
              color: colors.alphaColor(colors.black, 0.8),
            }}>{`${format(
            new Date(item.start_date),
            'EEEE, MMM dd',
          )} @ ${format(
            new Date(item.start_date),
            'hh:mm a',
          )}`}</AppText.Overline2>
        </SeparateChildren>
      </View>
    </TouchableOpacity>
  );
};

export const EventsCarrousel = () => {
  const { events = [] } = useAppSelector(state => state.museum);

  const renderItem = useCallback(
    ({ item }: { item: Event }) => _renderItem({ item }),
    [],
  );

  return (
    <View>
      <Carousel
        firstItem={0}
        loop
        loopClonesPerSide={3}
        activeSlideAlignment={'start'}
        inactiveSlideScale={1.0}
        inactiveSlideOpacity={1.0}
        data={events}
        slideStyle={styles.slideStyle}
        renderItem={renderItem}
        sliderWidth={sizes.deviceWidth}
        itemWidth={sizes.deviceWidth * SCALE_FACTOR_WIDTH}
        sliderHeight={sizes.deviceWidth * SCALE_FACTOR_WIDTH}
        itemHeight={sizes.deviceWidth * SCALE_FACTOR_HEIGHT}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  bubble: {
    borderRadius: 2.5,
    paddingVertical: 5,
  },
  slideStyle: {},
  paginationContainer: {
    width: sizes.deviceWidth,
    paddingVertical: 10,
    flex: 0,
    justifyContent: 'flex-start',
  },
  dotContainerStyle: {
    width: 6,
    height: 6,
    borderRadius: 5,
    marginRight: 8,
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 5,
  },
});
