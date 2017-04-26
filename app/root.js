import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Image,
  View,
  Dimensions,
} from 'react-native';

import Splash from './pages/Splash';
/**获取屏幕尺寸 */
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

export default class root extends React.Component {

  render() {

    let defaultName = 'Splash';
    let defaultComponent = Splash;

    return (
      <Navigator
        initialRoute={{ name: defaultName, component: defaultComponent }}
        configureScene={(route) => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
          let Component = route.component;
          return <Component {...route.params} navigator={navigator} />
        }}></Navigator>
    );
  }

}
