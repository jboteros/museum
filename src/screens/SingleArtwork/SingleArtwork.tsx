import React, { useEffect, ReactElement, useMemo } from 'react';
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
import { useActions } from './useActions';
import { colors, sizes } from '@/styles';
import { AppText, Arrow, SeparateChildren } from '@/components';
import { ExpandRow } from './ExpandRow';

export const SingleArtwork = () => {
  const navigation = useNavigation<NavigationProps>();

  const insets = useSafeAreaInsets();
  const { handleGetArtwork, handleResetArtwork } = useActions();

  const { artwork, loadingArtwork } = useAppSelector(state => state.museum);

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
    handleGetArtwork(id);
    return () => {
      handleResetArtwork();
    };
  }, [handleGetArtwork, id, handleResetArtwork]);

  const publicationHistory = useMemo(
    () => artwork?.publication_history.split('\n\n') ?? [],
    [artwork],
  );

  const exhibitionHistory = useMemo(
    () => artwork?.exhibition_history.split('\n\n') ?? [],
    [artwork],
  );

  if (loadingArtwork) {
    return (
      <View>
        <View
          style={{
            width: sizes.deviceWidth,
            height: sizes.deviceWidth,
            borderRadius: sizes.borderRadius.big,
            backgroundColor: colors.silver,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="small" />
        </View>
        <View
          style={{
            flex: 0,
            paddingHorizontal: sizes.contentMargin.full,
          }}>
          <View
            style={{
              marginTop: 10,
              width: '100%',
              height: 60,
              backgroundColor: colors.silver,
            }}
          />
          <View
            style={{
              marginTop: 10,
              width: '100%',
              height: 200,
              backgroundColor: colors.silver,
            }}
          />
          <View
            style={{
              marginTop: 10,
              width: '100%',
              height: 200,
              backgroundColor: colors.silver,
            }}
          />
        </View>
      </View>
    );
  }
  return (
    <>
      <ScrollView>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routeNames.IMAGE_VIEWER, {
              imageId: artwork?.image_id,
            })
          }>
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
        </TouchableOpacity>

        <View style={{ paddingHorizontal: sizes.contentMargin.double }}>
          <SeparateChildren
            Separator={() => (<View style={{ height: 20 }} />) as ReactElement}>
            <AppText.Headline2>{artwork?.title}</AppText.Headline2>
            <AppText.Body1>{artwork?.date_display}</AppText.Body1>
            <AppText.Body1>{artwork?.artist_display}</AppText.Body1>

            <AppText.Body2>{artwork?.thumbnail.alt_text}</AppText.Body2>
            <View style={{ marginVertical: 20 }}>
              <SeparateChildren
                Separator={() =>
                  (
                    <View
                      style={{
                        width: '95%',
                        alignSelf: 'center',
                        height: StyleSheet.hairlineWidth,
                        marginVertical: 15,
                        backgroundColor: colors.alphaColor(colors.black, 0.2),
                      }}
                    />
                  ) as ReactElement
                }>
                <View style={styles.textBlock}>
                  <AppText.ControlSelected style={styles.primaryText}>
                    Artist
                  </AppText.ControlSelected>
                  <AppText.ControlResting style={styles.secondaryText}>
                    {artwork?.artist_title}
                  </AppText.ControlResting>
                </View>
                <View style={styles.textBlock}>
                  <AppText.ControlSelected style={styles.primaryText}>
                    Title
                  </AppText.ControlSelected>
                  <AppText.ControlResting style={styles.secondaryText}>
                    ˝{artwork?.title}
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
                    Dimensions
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
            style={{
              width: sizes.deviceWidth * 0.8,
              alignSelf: 'center',
              backgroundColor: artwork.color
                ? `hsl(${artwork.color.h}, ${artwork.color.s}%, ${artwork.color.l}%)`
                : colors.primary,
              justifyContent: 'center',
            }}>
            <View
              style={{
                flex: 0,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                marginVertical: sizes.contentMargin.double,
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}>
              {artwork?.thumbnail && (
                <Image
                  resizeMode="contain"
                  style={{
                    width: '90%',

                    alignSelf: 'center',
                    marginVertical: sizes.contentMargin.half,
                    alignItems: 'center',
                    aspectRatio:
                      artwork?.thumbnail?.width / artwork?.thumbnail?.height,
                  }}
                  source={{
                    uri: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        )}

        <View style={{ paddingHorizontal: sizes.contentMargin.half }}>
          <ExpandRow headerTitle="Publication History">
            <SeparateChildren
              Separator={() =>
                (<View style={{ height: 10 }} />) as ReactElement
              }>
              {publicationHistory.filter(Boolean).map(publication => (
                <View key={publication}>
                  <AppText
                    style={{
                      color: colors.silverDark,
                      paddingHorizontal: sizes.contentMargin.full,
                    }}>
                    • {publication}
                  </AppText>
                </View>
              ))}
            </SeparateChildren>
          </ExpandRow>

          <ExpandRow headerTitle="Exhibition History">
            <SeparateChildren
              Separator={() =>
                (<View style={{ height: 10 }} />) as ReactElement
              }>
              {exhibitionHistory.filter(Boolean).map(publication => (
                <View key={publication}>
                  <AppText
                    style={{
                      color: colors.silverDark,
                      paddingHorizontal: sizes.contentMargin.full,
                    }}>
                    • {publication}
                  </AppText>
                </View>
              ))}
            </SeparateChildren>
          </ExpandRow>
        </View>
        <View
          style={{
            height: insets.bottom + 100,
          }}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          width: 40,
          height: 40,
          borderRadius: 20,
          left: 10,
          top: insets.top + 10,
          backgroundColor: colors.alphaColor(colors.primary, 0.9),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
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
});
