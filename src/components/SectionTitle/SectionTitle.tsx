import React, { memo } from 'react';
import { AppText } from '../AppText';
import { colors } from '@/styles';
import { StyleSheet } from 'react-native';

interface SectionTitleProps {
  title: string;
}
export const component = ({ title }: SectionTitleProps) => {
  return <AppText.Headline2 style={styles.title}>{title}</AppText.Headline2>;
};

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 10,
    marginVertical: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export const SectionTitle = memo(component);
