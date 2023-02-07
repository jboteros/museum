import React, { FC } from 'react';
import { ColorValue, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@/styles';

type Props = {
  color?: ColorValue;
  direction: 'up' | 'right' | 'down' | 'left'; // use object literals for stronger types
};

const DIRECTIONS = ['up', 'right', 'down', 'left'];

export const Arrow: FC<Props> = ({ direction, color = colors.silver }) => {
  const rotationAngle = (DIRECTIONS.indexOf(direction) * 90 + 180) % 360;
  return (
    <View
      style={{
        transform: [
          {
            rotate: `${rotationAngle}deg`,
          },
        ],
      }}>
      <Svg width={11} height={7} viewBox="0 0 11 7" fill="none">
        <Path
          d={`M1.068 
          1.329a.25.25 0 0 0 .01.353l4.25 4a.25.25 0 0 0 .343 0l4.25-4a.25.25 
          0 1 0-.342-.364L5.5 5.157l-4.079-3.84a.25.25 0 0 0-.353.012z`}
          fill={color}
          stroke={color}
          strokeWidth={2}
        />
      </Svg>
    </View>
  );
};
