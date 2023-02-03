import React from 'react';
import { AppText } from '../AppText';
import { colors } from '@/styles';

interface SectionTitleProps {
  title: string;
}
export const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <AppText.Headline2
      style={{
        paddingHorizontal: 10,
        marginVertical: 20,
        fontWeight: 'bold',
        color: colors.primary,
      }}>
      {title}
    </AppText.Headline2>
  );
};
