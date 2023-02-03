import { Dimensions } from 'react-native';

export function NormalizeFontSize(
  fontSize: number,
  standardScreenHeight: number = 846,
) {
  const { height } = Dimensions.get('window');

  const heightPercent = (fontSize * height) / standardScreenHeight;
  return Math.round(heightPercent);
}
