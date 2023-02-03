import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  ReactElement,
} from 'react';
import {
  FlatList,
  Image,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppSelector } from '@/core';
import { Artwork } from '@/core/museum/types';
import {
  AppText,
  EventsCarrousel,
  SectionTitle,
  SeparateChildren,
} from '@/components';
import { colors, sizes } from '@/styles';
import { useActions } from './useActions';
import { NotificationsIcon } from './NotificationsIcon';

const keyExtractor = (item: Artwork, index: number) => `${item?.id}-${index}`;

const _renderItem = ({ item }: { item?: Artwork }) => {
  if (!item) {
    return null;
  }

  return (
    <View
      style={{
        marginVertical: 20,
        marginHorizontal: sizes.contentMargin.full,
      }}>
      <View
        style={{
          width: sizes.deviceWidth * 0.8,
          alignSelf: 'center',
          backgroundColor: item.color
            ? `hsl(${item.color.h}, ${item.color.s}%, ${item.color.l}%)`
            : colors.primary,
          justifyContent: 'center',
        }}>
        <View
          style={{
            flex: 0,
            // shadowColor: '#000',
            // shadowOffset: {
            //   width: 0,
            //   height: 2,
            // },
            // shadowOpacity: 0.25,
            // shadowRadius: 3.84,

            // elevation: 5,
          }}>
          {item?.thumbnail && (
            <Image
              resizeMode="contain"
              style={{
                width: '90%',
                alignSelf: 'center',
                marginVertical: 10,
                alignItems: 'center',
                aspectRatio: item?.thumbnail?.width / item?.thumbnail?.height,
              }}
              source={{
                uri: `https://www.artic.edu/iiif/2/${item.image_id}/full/200,/0/default.jpg`,
              }}
            />
          )}
        </View>
      </View>
      <View
        style={{
          paddingVertical: 10,
          marginHorizontal: sizes.contentMargin.full,
        }}>
        <SeparateChildren Separator={() => <View style={{ height: 5 }} />}>
          <AppText.Headline5>{item.title}</AppText.Headline5>
          <AppText.Body1>{item.artist_title}</AppText.Body1>
        </SeparateChildren>
      </View>
    </View>
  );
};

export function HomeScreen(): JSX.Element {
  const flatListRef = useRef<FlatList>(null);

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { handleGetEvents, handleGetArtworks } = useActions();

  const { artworks = [] } = useAppSelector(state => state.museum);

  useEffect(() => {
    handleGetEvents();
    handleGetArtworks(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEndReached = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await handleGetArtworks();
    } finally {
      setIsRefreshing(false);
    }
  }, [handleGetArtworks]);

  const handleRefreshPull = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await handleGetArtworks(1);
    } finally {
      setIsRefreshing(false);
    }
  }, [handleGetArtworks]);

  const renderItem = useCallback(
    ({ item }: { item: Artwork }) => _renderItem({ item }),
    [],
  );

  const renderHeader = useCallback(
    () => (
      <>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: colors.silver,
              borderRadius: sizes.borderRadius.medium,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <NotificationsIcon color={colors.alphaColor(colors.primary, 0.5)} />
          </View>
          <Image
            source={require('./articLogo.png')}
            style={{ width: 70, height: 70 }}
          />
        </View>
        <SectionTitle title="Events" />
        <EventsCarrousel />
        <SectionTitle title="Artworks" />
      </>
    ),
    [],
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={artworks}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader()}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{ flexGrow: 1 }}
        onEndReached={handleEndReached}
        ItemSeparatorComponent={() =>
          (
            <View
              style={{
                width: '60%',
                alignSelf: 'center',
                marginBottom: 20,
                height: StyleSheet.hairlineWidth,
                backgroundColor: colors.alphaColor(colors.primaryDark, 0.5),
              }}
            />
          ) as ReactElement
        }
        refreshControl={Platform.select({
          ios: (
            <RefreshControl
              tintColor={colors.primary}
              refreshing={isRefreshing}
              onRefresh={handleRefreshPull}
            />
          ),
          android: (
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefreshPull}
              progressBackgroundColor={colors.primary}
              colors={[colors.primary, colors.primaryDark, colors.primaryLight]}
            />
          ),
        })}
      />
      <TouchableOpacity
        onPress={() => {
          flatListRef.current?.scrollToOffset({ animated: true, offset: -100 });
          handleGetArtworks;
        }}
        style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Text>{artworks.length}</Text>
      </TouchableOpacity>
    </View>
  );
}
