import React, { memo } from 'react';
import { ArtworkProps } from '@/core/museum/types';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { colors, sizes } from '@/styles';
import { AppText, SeparateChildren } from '@/components';

export const component = ({
  item,
  onSelect,
}: {
  item?: ArtworkProps;
  onSelect: () => void;
}) => {
  if (!item) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onSelect} style={styles.artContainer}>
      <View
        style={[
          styles.artItemTop,
          {
            backgroundColor: item.color
              ? `hsl(${item.color.h}, ${item.color.s}%, ${item.color.l}%)`
              : colors.primary,
          },
        ]}>
        <View style={styles.imageContainer}>
          {item?.thumbnail && (
            <Image
              resizeMode="contain"
              style={[
                styles.artImage,
                {
                  aspectRatio: item?.thumbnail?.width / item?.thumbnail?.height,
                },
              ]}
              source={{
                uri: `https://www.artic.edu/iiif/2/${item.image_id}/full/200,/0/default.jpg`,
              }}
            />
          )}
        </View>
      </View>
      <View style={styles.artDescription}>
        <SeparateChildren Separator={() => <View style={styles.separator} />}>
          <AppText.Subtitle2
            style={{
              color: colors.alphaColor(colors.black, 0.8),
            }}>
            {item.title}
          </AppText.Subtitle2>
          <AppText.Body1>
            {item.artist_title}
            {item.artist_title && item.fiscal_year && '  |  '}
            {item.fiscal_year && (
              <AppText.Overline2>{item.fiscal_year}</AppText.Overline2>
            )}
          </AppText.Body1>
        </SeparateChildren>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  artContainer: {
    marginVertical: 20,
    marginHorizontal: sizes.contentMargin.full,
  },
  artItemTop: {
    width: sizes.deviceWidth * 0.8,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  artImage: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 0,
  },
  artDescription: {
    paddingVertical: 10,
    marginHorizontal: sizes.contentMargin.full,
  },
  separator: { height: 5 },
});

export const ArtworkListItem = memo(component);
