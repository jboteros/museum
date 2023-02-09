import React, { ReactElement } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { format } from 'date-fns';
import { colors, sizes } from '@/styles';
import { EventProps } from '@/core/museum/types';
import { AppText } from '../AppText';
import { SeparateChildren } from '../SeparateChildren';
import { SCALE_FACTOR_HEIGHT } from './EventsCarrousel';

export const CarouselItem = ({
  item,
  onSelect,
}: {
  item: EventProps;
  onSelect: () => void;
}) => {
  if (!item) {
    return null;
  }

  return (
    <TouchableOpacity
      testID="carouselItem"
      key={item?.id}
      onPress={onSelect}
      style={styles.container}>
      {typeof item.image_url === 'string' && (
        <Image
          testID="itemImage"
          resizeMode="cover"
          source={{ uri: item.image_url }}
          style={{
            backgroundColor: colors.silver,
            ...StyleSheet.absoluteFillObject,
          }}
        />
      )}
      <View style={styles.content}>
        <SeparateChildren
          Separator={() => (<View style={styles.separator} />) as ReactElement}>
          <AppText.Subtitle2 numberOfLines={2}>{item.title}</AppText.Subtitle2>
          <AppText.Body1
            style={{ color: colors.alphaColor(colors.black, 0.8) }}>
            {item.location}
          </AppText.Body1>
          <AppText.Overline2 style={styles.date}>{`${format(
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

const styles = StyleSheet.create({
  container: {
    height: sizes.deviceWidth * SCALE_FACTOR_HEIGHT,
    padding: 5,
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'absolute',
    paddingHorizontal: sizes.contentMargin.full,
    paddingVertical: sizes.contentMargin.half,
    width: '100%',
    bottom: sizes.contentMargin.half,
    borderRadius: sizes.borderRadius.medium,
    backgroundColor: colors.alphaColor(colors.white, 0.8),
    justifyContent: 'space-around',
  },
  separator: { height: 8 },
  date: {
    alignSelf: 'flex-end',
    color: colors.alphaColor(colors.black, 0.8),
  },
});
