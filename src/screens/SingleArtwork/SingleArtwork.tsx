import React, { useEffect, ReactElement, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useRoute,
  RouteProp,
  RootStackParamList,
  routeNames,
  useSafeAreaInsets,
  useNavigation,
  NavigationProps,
} from '@/navigation';
import { useAppSelector } from '@/core';
import { colors, sizes } from '@/styles';
import { AppText, Arrow, SeparateChildren } from '@/components';
import { useActions } from './useActions';
import { ExpandRow } from './ExpandRow';

export const SingleArtwork = () => {
  const navigation = useNavigation<NavigationProps>();
  const insets = useSafeAreaInsets();
  const [isImageBroken, setIsImageBroken] = useState(false);

  const { handleGetArtwork, handleResetArtwork, toggleIsBuggy } = useActions();

  const { artwork, loadingArtwork, isArtworkBuggy } = useAppSelector(
    state => state.museum,
  );

  console.log(
    '🚀 ~ file: SingleArtwork.tsx:39 ~ SingleArtwork ~ isArtworkBuggy:',
    isArtworkBuggy,
  );
  const route = useRoute<
    RouteProp<
      {
        params: RootStackParamList[routeNames.SINGLE_ARTWORK];
      },
      'params'
    >
  >();

  const { id } = route.params;

  useEffect(() => {
    toggleIsBuggy();
    handleGetArtwork(id);
    return () => {
      handleResetArtwork();
    };
  }, [handleGetArtwork, id, handleResetArtwork, toggleIsBuggy]);

  const publicationHistory = useMemo(
    () => artwork?.publication_history?.split('\n\n') ?? [],
    [artwork],
  );

  const exhibitionHistory = useMemo(
    () => artwork?.exhibition_history?.split('\n\n') ?? [],
    [artwork],
  );

  if (loadingArtwork) {
    return (
      <View>
        <View style={styles.skeletonContainer}>
          <ActivityIndicator size="small" />
        </View>
        <View style={styles.skeletonTitleContainer}>
          <View style={styles.skeletonItem} />
          <View style={styles.skeletonItem} />
          <View style={styles.skeletonItem} />
        </View>
      </View>
    );
  }

  const toggleIsImageBroken = (isBroken: boolean) => {
    if (isArtworkBuggy) {
      setIsImageBroken(isBroken);
    }
  };

  return (
    <>
      <ScrollView
        scrollEventThrottle={20}
        onScroll={() => toggleIsImageBroken(true)}
        onScrollEndDrag={() => toggleIsImageBroken(false)}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routeNames.IMAGE_VIEWER, {
              imageId: isArtworkBuggy ? null : artwork?.image_id,
            })
          }>
          {typeof artwork?.image_id === 'string' ? (
            <Image
              source={{
                uri: `https://www.artic.edu/iiif/2/${artwork?.image_id}/full/800,/0/default.jpg`,
              }}
              resizeMode="cover"
              style={{
                width: sizes.deviceWidth,
                height: sizes.deviceWidth,
                borderRadius: sizes.borderRadius.big,
              }}
            />
          ) : (
            <View
              style={{
                width: sizes.deviceWidth,
                height: sizes.deviceWidth,
                borderRadius: sizes.borderRadius.big,
              }}
            />
          )}
        </TouchableOpacity>

        <View style={{ paddingHorizontal: sizes.contentMargin.double }}>
          <SeparateChildren
            Separator={() =>
              (<View style={styles.separator} />) as ReactElement
            }>
            <AppText.Headline2>{artwork?.title}</AppText.Headline2>
            <AppText.Body1>{artwork?.date_display}</AppText.Body1>
            <AppText.Body1>{artwork?.artist_display}</AppText.Body1>

            <AppText.Body2>{artwork?.thumbnail.alt_text}</AppText.Body2>
            <View style={styles.listContainer}>
              <SeparateChildren
                Separator={() =>
                  (<View style={styles.listSeparator} />) as ReactElement
                }>
                <View style={styles.textBlock}>
                  <AppText.ControlSelected style={styles.primaryText}>
                    Artist
                  </AppText.ControlSelected>
                  <AppText.ControlResting style={styles.secondaryText}>
                    {isArtworkBuggy
                      ? '{artwork?.artist_title}'
                      : artwork?.artist_title}
                  </AppText.ControlResting>
                </View>
                <View style={styles.textBlock}>
                  <AppText.ControlSelected style={styles.primaryText}>
                    Title
                  </AppText.ControlSelected>
                  <AppText.ControlResting style={styles.secondaryText}>
                    {artwork?.title}
                  </AppText.ControlResting>
                </View>
                <View style={styles.textBlock}>
                  <AppText.ControlSelected style={styles.primaryText}>
                    Place
                  </AppText.ControlSelected>
                  <AppText.ControlResting style={styles.secondaryText}>
                    {artwork?.place_of_origin} (Artist's nationality)
                  </AppText.ControlResting>
                </View>
                <View style={styles.textBlock}>
                  <AppText.ControlSelected style={styles.primaryText}>
                    Date
                  </AppText.ControlSelected>
                  <AppText.ControlResting style={styles.secondaryText}>
                    {artwork?.date_display}
                  </AppText.ControlResting>
                </View>
                <View style={styles.textBlock}>
                  <AppText.ControlSelected style={styles.primaryText}>
                    Medium
                  </AppText.ControlSelected>
                  <AppText.ControlResting style={styles.secondaryText}>
                    {artwork?.medium_display}
                  </AppText.ControlResting>
                </View>
                <View style={styles.textBlock}>
                  <AppText.ControlSelected style={styles.primaryText}>
                    {isArtworkBuggy ? 'DIMENSIONS' : 'Dimensions'}
                  </AppText.ControlSelected>
                  <AppText.ControlResting style={styles.secondaryText}>
                    {artwork?.dimensions}
                  </AppText.ControlResting>
                </View>
                <View style={styles.textBlock}>
                  <AppText.ControlSelected style={styles.primaryText}>
                    Credit Line
                  </AppText.ControlSelected>
                  <AppText.ControlResting style={styles.secondaryText}>
                    {artwork?.credit_line}
                  </AppText.ControlResting>
                </View>
                <View style={styles.textBlock}>
                  <AppText.ControlSelected style={styles.primaryText}>
                    Reference Number
                  </AppText.ControlSelected>
                  <AppText.ControlResting style={styles.secondaryText}>
                    {artwork?.main_reference_number}
                  </AppText.ControlResting>
                </View>
              </SeparateChildren>
            </View>
          </SeparateChildren>
        </View>
        {artwork && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(routeNames.IMAGE_VIEWER, {
                imageId: artwork.image_id,
              });
            }}
            style={[
              styles.artworkContainer,
              {
                backgroundColor: artwork.color
                  ? `hsl(${artwork.color.h}, ${artwork.color.s}%, ${artwork.color.l}%)`
                  : colors.primary,
              },
            ]}>
            <View
              style={[
                styles.artworkImageContainer,
                isImageBroken && {
                  transform: [{ translateY: -5 }],
                },
              ]}>
              {artwork?.thumbnail && (
                <Image
                  resizeMode="contain"
                  style={[
                    styles.artworkImage,
                    {
                      aspectRatio:
                        artwork?.thumbnail?.width / artwork?.thumbnail?.height,
                    },
                    {
                      aspectRatio:
                        artwork?.thumbnail?.width / artwork?.thumbnail?.height,
                    },
                  ]}
                  source={{
                    uri: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        )}

        <View style={{ paddingHorizontal: sizes.contentMargin.half }}>
          {publicationHistory.length > 0 && (
            <ExpandRow headerTitle="Publication History">
              <SeparateChildren
                Separator={() =>
                  (<View style={styles.separator} />) as ReactElement
                }>
                {publicationHistory.filter(Boolean).map(publication => (
                  <View key={publication}>
                    <AppText
                      style={{
                        color: colors.silverDark,
                        paddingHorizontal: sizes.contentMargin.full,
                      }}>
                      • {publication?.replace(/(<([^>]+)>)/gi, '')}
                    </AppText>
                  </View>
                ))}
              </SeparateChildren>
            </ExpandRow>
          )}
          {exhibitionHistory.length > 0 && (
            <ExpandRow headerTitle="Exhibition History">
              <SeparateChildren
                Separator={() =>
                  (<View style={styles.separator} />) as ReactElement
                }>
                {exhibitionHistory.filter(Boolean).map(exhibition => (
                  <View key={exhibition}>
                    <AppText
                      style={{
                        color: colors.silverDark,
                        paddingHorizontal: sizes.contentMargin.full,
                      }}>
                      • {exhibition?.replace(/(<([^>]+)>)/gi, '')}
                    </AppText>
                  </View>
                ))}
              </SeparateChildren>
            </ExpandRow>
          )}
        </View>
        <View
          style={{
            height: insets.bottom + 100,
          }}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[
          styles.backButton,
          {
            top: insets.top + 10,
          },
        ]}>
        <Arrow direction="left" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  textBlock: {
    flexDirection: 'row',
  },
  primaryText: { width: 80 },
  secondaryText: { flex: 3, marginHorizontal: 20, color: colors.silverDark },

  skeletonContainer: {
    width: sizes.deviceWidth,
    height: sizes.deviceWidth,
    borderRadius: sizes.borderRadius.big,
    backgroundColor: colors.silver,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonTitleContainer: {
    flex: 0,
    paddingHorizontal: sizes.contentMargin.full,
  },
  skeletonItem: {
    marginTop: 10,
    width: '100%',
    height: 60,
    backgroundColor: colors.silver,
  },
  separator: { height: 20 },
  listContainer: { marginVertical: 20 },
  listSeparator: {
    width: '95%',
    alignSelf: 'center',
    height: StyleSheet.hairlineWidth,
    marginVertical: 15,
    backgroundColor: colors.alphaColor(colors.black, 0.2),
  },
  artworkContainer: {
    width: sizes.deviceWidth * 0.8,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  artworkImageContainer: {
    flex: 0,
  },
  artworkImage: {
    width: '90%',

    alignSelf: 'center',
    marginVertical: sizes.contentMargin.half,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    left: 10,

    backgroundColor: colors.alphaColor(colors.primary, 0.9),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
