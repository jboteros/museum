import React, { useState, useCallback, ReactNode } from 'react';
import {
  View,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { TouchableOpacity as AndroidTouchableOpacity } from 'react-native-gesture-handler';
import { Arrow, AppText } from '@/components';
import { colors, sizes } from '@/styles';

type Props = {
  headerTitle: string;
  children?: ReactNode;
};

export function ExpandRow({ headerTitle, children }: Props) {
  const [expandRow, setExpandRow] = useState(false);

  const onExpandPress = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandRow(v => !v);
  }, []);

  const TouchableLayout =
    Platform.OS === 'ios' ? TouchableOpacity : AndroidTouchableOpacity;

  return (
    <View style={styles.container}>
      <TouchableLayout
        activeOpacity={0.2}
        onPress={onExpandPress}
        style={styles.content}>
        <View style={styles.fieldCenter} pointerEvents="box-none">
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <View style={styles.subtitleContainer}>
                <AppText.Subtitle2>{headerTitle}</AppText.Subtitle2>
              </View>
              <View style={styles.rowContainer}>
                <Arrow
                  direction={expandRow ? 'up' : 'down'}
                  color={colors.primary}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableLayout>
      {expandRow && (
        <View
          style={{
            paddingHorizontal: sizes.contentMargin.full,
          }}>
          <View style={styles.childContainer} />
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 10 },
  content: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: sizes.contentMargin.double,
  },
  fieldCenter: {
    flex: 1,
    marginLeft: 5,
  },

  childContainer: {
    width: '95%',
    alignSelf: 'center',
    height: StyleSheet.hairlineWidth,
    marginVertical: sizes.contentMargin.full,
    backgroundColor: colors.alphaColor(colors.black, 0.2),
  },
  textContainer: { flexDirection: 'row' },
  infoContainer: { paddingHorizontal: 10 },
  rowContainer: {
    flex: 0,
    justifyContent: 'center',
  },
  subtitleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
});
