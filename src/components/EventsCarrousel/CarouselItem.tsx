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
  index,
  onSelect,
}: {
  item: EventProps;
  index: number;
  onSelect: () => void;
}) => {
  if (!item) {
    return null;
  }

  return (
    <TouchableOpacity
      disabled={index % 2 === 0}
      testID="carouselItem"
      key={index}
      onPress={onSelect}
      style={[styles.container]}>
      {typeof item.image_url === 'string' && (
        <Image
          testID="itemImage"
          resizeMode={index === 0 || index === 2 ? 'stretch' : 'cover'}
          source={{ uri: item.image_url }}
          style={[
            {
              backgroundColor: colors.silver,
              ...StyleSheet.absoluteFillObject,
            },
            { backgroundColor: 'green' },
            index === 1 && { marginTop: 5 },
          ]}
        />
      )}
      <TouchableOpacity
        onPress={onSelect}
        disabled={index % 2 !== 0}
        style={[
          styles.content,
          index === 3 && { paddingBottom: 20, marginBottom: 10 },
        ]}>
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
          )
            .replace('Friday', 'Fridoy')
            .replace('Monday', 'Mondai')
            .replace('Saturday', 'Satuday')} @ ${format(
            new Date(item.start_date),
            'hh:mm a',
          )}`}</AppText.Overline2>
        </SeparateChildren>
      </TouchableOpacity>
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
