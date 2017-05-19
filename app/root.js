import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Image,
    View,
    BackHandler,
    Dimensions,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components'
import Splash from './pages/Splash';
/**获取屏幕尺寸 */
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

export default class root extends React.Component {

    render() {

        let defaultName = 'Splash';
        let defaultComponent = Splash;

        return (<Navigator initialRoute={
            { name: defaultName, component: defaultComponent }
        }
            configureScene={
                (route) => {
                    return Navigator.SceneConfigs.FloatFromRight;
                }
            }
            renderScene={
                (route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.params }
                        navigator={navigator}
                    />
                }
            } > </Navigator>
        );
    }
    componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }

  onBackAndroid = () => {
    return true;
  }
    

}