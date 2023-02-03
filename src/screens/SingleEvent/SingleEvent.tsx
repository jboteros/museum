import React, { useEffect, ReactElement } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
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
} from '@/navigation';
import { useAppSelector } from '@/core';
import { useActions } from './useActions';
import { colors, sizes } from '@/styles';
import { AppText, Arrow, SeparateChildren } from '@/components';
import { format } from 'date-fns';

export const SingleEvent = () => {
  const navigation = useNavigation();
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
            Separator={() => (<View style={{ height: 20 }} />) as ReactElement}>
            <AppText.Headline1>{event?.title}</AppText.Headline1>
            {event?.start_date && (
              <AppText.Overline2
                style={{
                  alignSelf: 'flex-end',
                  color: colors.alphaColor(colors.black, 0.8),
                }}>{`${format(
                new Date(event?.start_date),
                'EEEE, MMM dd',
              )} @ ${format(
                new Date(event?.start_date),
                'hh:mm a',
              )}`}</AppText.Overline2>
            )}
            {event?.location && (
              <AppText.Overline2
                style={{
                  alignSelf: 'flex-end',
                  color: colors.alphaColor(colors.black, 0.8),
                }}>
                {event?.location}
              </AppText.Overline2>
            )}
            <AppText.Headline5
              style={{ color: colors.alphaColor(colors.black, 0.8) }}>
              {event?.short_description}
            </AppText.Headline5>
            {event?.list_description && (
              <AppText.Subhead
                style={{
                  fontWeight: 'bold',

                  color: colors.alphaColor(colors.black, 0.95),
                }}>
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
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: sizes.deviceWidth,
          paddingBottom: insets.bottom,
          paddingTop: 10,
        }}>
        <TouchableOpacity
          style={{
            width: '80%',
            alignSelf: 'center',
            borderRadius: 100,
            paddingVertical: 20,
            backgroundColor: colors.primary,
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <AppText.Button style={{ color: colors.silver }}>
            {event?.buy_button_text}
          </AppText.Button>
        </TouchableOpacity>
      </View>
    </>
  );
};
