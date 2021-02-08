/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Home from './src/home';
import Detail from './src/coviddetail';
import homeNavigation from './navigation/homestack';

AppRegistry.registerComponent(appName, () => homeNavigation);
