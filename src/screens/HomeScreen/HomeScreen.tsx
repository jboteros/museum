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
  TouchableOpacity,
  View,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {
  NavigationProps,
  routeNames,
  useNavigation,
  useSafeAreaInsets,
} from '@/navigation';
import { colors, sizes } from '@/styles';
import {
  AppText,
  Arrow,
  EventsCarrousel,
  SectionTitle,
  SeparateChildren,
} from '@/components';
import { useSpring } from '@/hooks/useSpring';
import { ArtworkProps } from '@/core/museum/types';
import { useActions } from './useActions';
import { useStore } from './useStore';
import { NotificationsIcon } from './NotificationsIcon';

const keyExtractor = (item: ArtworkProps, index: number) =>
  `${item?.id}-${index}`;

const _renderItem = ({
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

export function HomeScreen(): JSX.Element {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProps>();
  const flatListRef = useRef<FlatList>(null);

  const [isActive, setIsActive] = useState<boolean>(false);

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { handleGetEvents, handleGetArtworks } = useActions();

  const { artworks, loadingArtworks, loadingEvent } = useStore();

  const animate = useSpring(
    { to: isActive ? 1 : 0 },
    {
      stiffness: 50,
    },
  );

  const opacity = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  }) as unknown as number;

  const translateYContent = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -250],
  }) as unknown as number;

  useEffect(() => {
    handleGetEvents();
    handleGetArtworks(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = useCallback(
    (e: { nativeEvent: { contentOffset: { y: number } } }) => {
      if (e.nativeEvent.contentOffset.y <= 0 && isActive === true) {
        setIsActive(false);
      } else if (e.nativeEvent.contentOffset.y > 0 && isActive === false) {
        setIsActive(true);
      }
    },
    [isActive],
  );

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

  const handleSelectArtwork = useCallback(
    (artwork: ArtworkProps) =>
      navigation.navigate(routeNames.SINGLE_ARTWORK, { id: artwork.id }),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: ArtworkProps }) =>
      _renderItem({
        item,
        onSelect: () => {
          handleSelectArtwork(item);
        },
      }),
    [handleSelectArtwork],
  );

  const renderHeader = useCallback(
    () => (
      <View style={{ marginTop: insets.top }}>
        <SectionTitle title="Events" />
        <EventsCarrousel />
        <SectionTitle title="Artworks" />
      </View>
    ),
    [insets.top],
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          { paddingTop: insets.top },
          { transform: [{ translateY: translateYContent }] },
        ]}>
        <View style={styles.notificationsIcon}>
          <NotificationsIcon color={colors.alphaColor(colors.primary, 0.5)} />
        </View>
        <Image source={require('./articLogo.png')} style={styles.articLogo} />
      </Animated.View>

      {!loadingArtworks || loadingEvent ? (
        <FlatList
          ref={flatListRef}
          data={artworks}
          onScroll={handleScroll}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader()}
          onEndReachedThreshold={0.1}
          contentContainerStyle={[
            styles.contentContainerStyle,
            {
              paddingTop: Platform.OS === 'ios' ? insets.top : insets.top + 50,
            },
          ]}
          onEndReached={handleEndReached}
          ItemSeparatorComponent={() =>
            (<View style={styles.listSeparator} />) as ReactElement
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
                progressBackgroundColor={colors.silver}
                colors={[
                  colors.primary,
                  colors.primaryDark,
                  colors.primaryLight,
                ]}
              />
            ),
          })}
        />
      ) : (
        <View style={styles.listSkeleton}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      )}
      <TouchableOpacity
        onPress={() =>
          flatListRef.current?.scrollToOffset({
            animated: true,
            offset: -insets.top * 2,
          })
        }>
        <Animated.View
          style={[styles.arrowUp, { bottom: insets.bottom + 10, opacity }]}>
          <Arrow direction="up" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    zIndex: 1,
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: sizes.contentMargin.full,
    top: 0,
    marginTop: 20,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  articLogo: { width: 70, height: 70 },
  notificationsIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.silver,
    borderRadius: sizes.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  listSeparator: {
    width: '60%',
    alignSelf: 'center',
    marginBottom: 20,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.alphaColor(colors.primaryDark, 0.5),
  },
  arrowUp: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    right: 10,

    backgroundColor: colors.alphaColor(colors.primary, 0.9),
    justifyContent: 'center',
    alignItems: 'center',
  },

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
  listSkeleton: {
    height: sizes.deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
