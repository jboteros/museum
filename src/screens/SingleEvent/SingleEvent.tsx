import React, { useEffect, ReactElement } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { format } from 'date-fns';
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
import { generateLocalNotification } from '@/util/notificationsHelper';
import { useActions } from './useActions';

export const SingleEvent = () => {
  const navigation = useNavigation<NavigationProps>();
  const insets = useSafeAreaInsets();
  const { handleGetEvent, handleResetEvent } = useActions();

  const { event, loadingEvent } = useAppSelector(state => state.museum);

  const route = useRoute<
    RouteProp<
      {
        params: RootStackParamList[routeNames.SINGLE_EVENT];
      },
      'params'
    >
  >();

  const { id } = route.params;

  useEffect(() => {
    handleGetEvent(id);
    return () => {
      handleResetEvent();
    };
  }, [handleGetEvent, id, handleResetEvent]);

  if (loadingEvent) {
    return (
      <View>
        <View style={style.skeletonContainer}>
          <ActivityIndicator size="small" />
        </View>
        <View style={style.skeletonContent}>
          <View style={style.skeletonItem} />
          <View style={style.skeletonItem} />
          <View style={style.skeletonItem} />
        </View>
      </View>
    );
  }
  return (
    <>
      <ScrollView>
        <Image
          source={{ uri: event?.image_url }}
          resizeMode="cover"
          style={{
            width: sizes.deviceWidth,
            height: sizes.deviceWidth,
            borderRadius: sizes.borderRadius.big,
          }}
        />

        <View style={{ paddingHorizontal: sizes.contentMargin.full }}>
          <SeparateChildren
            Separator={() =>
              (<View style={style.separator} />) as ReactElement
            }>
            <AppText.Headline1>{event?.title}</AppText.Headline1>
            {event?.start_date && (
              <AppText.Overline2 style={style.listText}>{`${format(
                new Date(event?.start_date),
                'EEEE, MMM dd',
              )} @ ${format(
                new Date(event?.start_date),
                'hh:mm a',
              )}`}</AppText.Overline2>
            )}
            {event?.location && (
              <AppText.Overline2 style={style.listText}>
                {event?.location}
              </AppText.Overline2>
            )}
            <AppText.Headline5
              style={{ color: colors.alphaColor(colors.black, 0.8) }}>
              {event?.short_description.replace(/(<([^>]+)>)/gi, '')}
            </AppText.Headline5>
            {event?.list_description && (
              <AppText.Subhead style={style.textDescription}>
                {event?.list_description.replace(/(<([^>]+)>)/gi, '')}
              </AppText.Subhead>
            )}
            {event?.description && (
              <AppText.Body1
                style={{
                  color: colors.alphaColor(colors.black, 0.95),
                }}>
                {event?.description.replace(/(<([^>]+)>)/gi, '')}
              </AppText.Body1>
            )}
          </SeparateChildren>
        </View>

        <View
          style={{
            height: insets.bottom + 100,
          }}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[style.backButton, { top: insets.top + 10 }]}>
        <Arrow direction="left" />
      </TouchableOpacity>
      <View style={[style.ctaContainer, { paddingBottom: insets.bottom + 5 }]}>
        <TouchableOpacity
          onPress={() => {
            generateLocalNotification({
              title: event?.title,
              body: event?.short_description.replace(/(<([^>]+)>)/gi, ''),
              id: event?.id.toString(),
              image: event?.image_url,
              diffUnit: 'minutes',
            });
          }}
          style={style.cta}>
          <AppText.Button style={{ color: colors.silver }}>
            {event?.buy_button_text}
          </AppText.Button>
        </TouchableOpacity>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    width: sizes.deviceWidth,
    paddingTop: 10,
  },
  cta: {
    width: '80%',
    alignSelf: 'center',
    borderRadius: 100,
    paddingVertical: 20,
    backgroundColor: colors.primary,
    alignContent: 'center',
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
  textDescription: {
    fontWeight: 'bold',
    color: colors.alphaColor(colors.black, 0.95),
  },
  separator: { height: 20 },
  listText: {
    alignSelf: 'flex-end',
    color: colors.alphaColor(colors.black, 0.8),
  },
  skeletonContainer: {
    width: sizes.deviceWidth,
    height: sizes.deviceWidth,
    borderRadius: sizes.borderRadius.big,
    backgroundColor: colors.silver,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonContent: {
    flex: 0,
    paddingHorizontal: sizes.contentMargin.full,
  },
  skeletonItem: {
    marginTop: 10,
    width: '100%',
    height: 60,
    backgroundColor: colors.silver,
  },
});
