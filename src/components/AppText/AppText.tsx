import React from 'react';
import {
  Text as RNText,
  type TextProps,
  type TextStyle,
  StyleSheet,
} from 'react-native';
import { NormalizeFontSize } from '@/styles';

export const AppText = ({
  children,
  style: styleProps,
  ...props
}: TextProps) => {
  return (
    <RNText style={styleProps} {...props}>
      {children}
    </RNText>
  );
};

export const textStyles = StyleSheet.create({
  headline1: {
    fontSize: NormalizeFontSize(48),
    fontWeight: 'bold',
  },
  headline2: {
    fontWeight: '600',
    fontSize: NormalizeFontSize(34),
    letterSpacing: 0.25,
  },
  headline2B: {
    fontWeight: '500',
    fontSize: NormalizeFontSize(28),
    letterSpacing: 1,
  },
  headline3: {
    fontWeight: 'bold',
    fontSize: NormalizeFontSize(26),
  },
  headline4: {
    fontWeight: '600',
    fontSize: NormalizeFontSize(20),
    letterSpacing: 0.15,
  },
  headline5: {
    fontSize: NormalizeFontSize(20),
    letterSpacing: 0.15,
  },
  subtitle2: {
    fontWeight: '600',
    fontSize: NormalizeFontSize(16),
    letterSpacing: 0.15,
    lineHeight: NormalizeFontSize(24),
  },
  subtitle1: {
    fontWeight: '600',
    fontSize: NormalizeFontSize(14),
    letterSpacing: 0.15,

    lineHeight: NormalizeFontSize(24),
  },
  body2: { fontSize: NormalizeFontSize(16), letterSpacing: 0.5 },
  body1: { fontSize: NormalizeFontSize(14), letterSpacing: 0.25 },
  button: {
    fontWeight: '600',
    fontSize: NormalizeFontSize(14),
    letterSpacing: 0.25,
  },

  controlSelected: {
    fontSize: NormalizeFontSize(13),
    fontWeight: '600',
    letterSpacing: 0.2,
    lineHeight: NormalizeFontSize(16),
  },
  controlResting: {
    fontSize: NormalizeFontSize(13),
    fontWeight: '400',
    letterSpacing: 0.2,
    lineHeight: NormalizeFontSize(16),
  },
  subhead: {
    fontSize: NormalizeFontSize(12),
    fontWeight: '600',
    letterSpacing: 0.4,
    lineHeight: NormalizeFontSize(16),
  },

  caption: {
    fontSize: NormalizeFontSize(12),
    fontWeight: '400',
    letterSpacing: 0.4,
    lineHeight: NormalizeFontSize(16),
  },
  overline: {
    fontWeight: '600',
    fontSize: NormalizeFontSize(10),
    lineHeight: NormalizeFontSize(12),
    letterSpacing: 1,
  },
  overline2: {
    fontWeight: '500',
    fontSize: NormalizeFontSize(10),
    lineHeight: NormalizeFontSize(12),
  },
});

export const withDefaultStyle =
  (defaultStyle: TextStyle, Component: any) =>
  ({ style, ...props }: TextProps) =>
    <Component style={[defaultStyle, style]} {...props} />;

AppText.Headline1 = withDefaultStyle(textStyles.headline1, AppText);
AppText.Headline2 = withDefaultStyle(textStyles.headline2, AppText);
AppText.Headline2B = withDefaultStyle(textStyles.headline2B, AppText);
AppText.Headline3 = withDefaultStyle(textStyles.headline3, AppText);
AppText.Headline4 = withDefaultStyle(textStyles.headline4, AppText);
AppText.Headline5 = withDefaultStyle(textStyles.headline5, AppText);
AppText.Subtitle2 = withDefaultStyle(textStyles.subtitle2, AppText);
AppText.Subtitle1 = withDefaultStyle(textStyles.subtitle1, AppText);
AppText.Body2 = withDefaultStyle(textStyles.body2, AppText);
AppText.Body1 = withDefaultStyle(textStyles.body1, AppText);
AppText.ControlSelected = withDefaultStyle(textStyles.controlSelected, AppText);
AppText.ControlResting = withDefaultStyle(textStyles.controlResting, AppText);
AppText.Subhead = withDefaultStyle(textStyles.subhead, AppText);
AppText.Button = withDefaultStyle(textStyles.button, AppText);
AppText.Caption = withDefaultStyle(textStyles.caption, AppText);
AppText.Overline = withDefaultStyle(textStyles.overline, AppText);
AppText.Overline2 = withDefaultStyle(textStyles.overline2, AppText);
