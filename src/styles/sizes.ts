import { Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const borderRadius = { small: 3, medium: 6, big: 10, extra: 20 };

const contentMargin = { double: 20, full: 10, half: 5 };

export const sizes = {
  contentMargin,
  borderRadius,
  deviceHeight,
  deviceWidth,
};
