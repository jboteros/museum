export {
  useSafeAreaInsets,
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

export {
  useFocusEffect,
  useNavigation,
  useRoute,
  CommonActions,
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  useNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
export type { RouteProp } from '@react-navigation/native';

export { createStackNavigator } from '@react-navigation/stack';

export { Router } from './Router';

import { routeNames } from './routeNames';
export { routeNames } from './routeNames';

export type RootStackParamList = {
  [routeNames.SPLASH_LOADER]: undefined;
  [routeNames.HOME_SCREEN]: undefined;
  [routeNames.SINGLE_EVENT]: { id: number };
};

export type NavigationProps = {
  navigate: (value: string, params?: any) => void;
  goBack: () => void;
  dispatch: (value: any) => void;
};
