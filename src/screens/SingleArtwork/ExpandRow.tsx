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
    <View style={{ marginTop: 10 }}>
      <TouchableLayout
        activeOpacity={0.2}
        onPress={onExpandPress}
        style={styles.container}>
        <View style={styles.fieldCenter} pointerEvents="box-none">
          <View style={{ paddingHorizontal: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  flexDirection: 'column',
                }}>
                <AppText.Subtitle2>{headerTitle}</AppText.Subtitle2>
              </View>
              <View
                style={{
                  flex: 0,
                  justifyContent: 'center',
                }}>
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
          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              height: StyleSheet.hairlineWidth,
              marginVertical: sizes.contentMargin.full,
              backgroundColor: colors.alphaColor(colors.black, 0.2),
            }}
          />
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
});
