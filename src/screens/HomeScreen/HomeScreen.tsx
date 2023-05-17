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
import { Arrow, EventsCarrousel, SectionTitle } from '@/components';
import { useSpring } from '@/hooks/useSpring';
import { ArtworkProps } from '@/core/museum/types';
import { useActions } from './useActions';
import { useStore } from './useStore';
import { NotificationsIcon } from './NotificationsIcon';
import { ArtworkListItem } from './ArtworkItem';
import { ComponentWithError } from './ComponentWithError';

const keyExtractor = (item: ArtworkProps, index: number) =>
  `${item?.id}-${index}`;

const _renderItem = ({
  item,
  onSelect,
}: {
  item?: ArtworkProps;
  onSelect: () => void;
}) => <ArtworkListItem item={item} onSelect={onSelect} />;

export function HomeScreen(): JSX.Element {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProps>();
  const flatListRef = useRef<FlatList>(null);

  const [showError, setShowError] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { handleGetEvents, handleGetArtworks } = useActions();

  const { artworks, loadingArtworks, loadingEvent } = useStore();

  const animate = useSpring(
    { to: isActive ? 1 : 0 },
    {
      stiffness: 5,
    },
  );

  const opacity = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  }) as unknown as number;

  const translateYContent = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -90],
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
        <SectionTitle title="Eventos" />
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
        <TouchableOpacity
          onPress={() => {
            setShowError(true);
          }}
          style={styles.notificationsIcon}>
          <NotificationsIcon color={colors.alphaColor(colors.primary, 0.5)} />
        </TouchableOpacity>
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
          initialNumToRender={4}
          removeClippedSubviews
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
      {showError && <ComponentWithError />}
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
    paddingLeft: 10,
    paddingRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  articLogo: { width: 70, height: 70, marginTop: 10 },
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
  listSkeleton: {
    height: sizes.deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
