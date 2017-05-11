import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  Dimensions,
} from 'react-native';

import { Navigator } from 'react-native-deprecated-custom-components'
import Splash from './pages/Splash';
import Home from './home/Home';
/**获取屏幕尺寸 */
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

export default class root extends React.Component {

  render() {

    let defaultName = 'Splash';
    let defaultComponent = Splash;

    return (
      <Home />
    );
  }

}
