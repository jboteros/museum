/**
 * @format
 */

import { AppRegistry, LogBox, Platform, UIManager } from 'react-native';
import 'react-native-gesture-handler';
import { App } from './src/App';
import { name as appName } from './app.json';

LogBox.ignoreLogs(['ViewPropTypes']);

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

AppRegistry.registerComponent(appName, () => App);
