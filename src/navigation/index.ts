export {
  useSafeAreaInsets,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

export {
  useNavigation,
  useRoute,
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
export type { RouteProp } from '@react-navigation/native';

export { createStackNavigator } from '@react-navigation/stack';

export { Router } from './Router';

import { routeNames } from './routeNames';
export { routeNames } from './routeNames';

export type RootStackParamList = {
  [routeNames.HOME_SCREEN]: undefined;
  [routeNames.SINGLE_EVENT]: { id: number };
  [routeNames.SINGLE_ARTWORK]: { id: number };
  [routeNames.IMAGE_VIEWER]: { imageId: number };
};

export type NavigationProps = {
  navigate: (value: string, params?: any) => void;
  goBack: () => void;
  dispatch: (value: any) => void;
};
