import React, { useCallback, useEffect } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { useAppSelector } from '@/core';
import { Event } from '@/core/museum/types';
import { EventsCarrousel, SectionTitle } from '@/components';
import { colors, sizes } from '@/styles';
import { useActions } from './useActions';
import { NotificationsIcon } from './NotificationsIcon';

const keyExtractor = (item: Event, index: number) =>
  (item?.id || index).toString();

const _renderItem = ({ item }: { item?: Event }) => {
  if (!item) {
    return null;
  }

  return (
    <View key={item.id} style={{ marginVertical: 5 }}>
      <Text>{item.title}</Text>
    </View>
  );
};

export function HomeScreen(): JSX.Element {
  const { handleGetEvents, handleGetArtworks } = useActions();

  const { events = [] } = useAppSelector(state => state.museum);

  useEffect(() => {
    handleGetEvents();
    // handleGetArtworks();
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Event }) => _renderItem({ item }),
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
        data={events}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader()}
      />
    </View>
  );
}
