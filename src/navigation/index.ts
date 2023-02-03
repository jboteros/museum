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

export { createStackNavigator } from '@react-navigation/stack';

export { Router } from './Router';

import { routeNames } from './routeNames';
export { routeNames } from './routeNames';

export type RootStackParamList = {
  [routeNames.SPLASH_LOADER]: undefined;
  [routeNames.HOME_SCREEN]: undefined;
};
