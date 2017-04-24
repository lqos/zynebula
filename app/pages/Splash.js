import React, { Component } from 'react';
import {
  Text,
  navigator,
  StatusBar,
  Image
} from 'react-native';

import Home from '../home/Home';
import Tools from '../utils/Tools';
import {
  MapView,
  MapTypes,
  Geolocation
} from 'react-native-baidu-map';
import Storage from '../utils/Storage';
import * as WeChat from 'react-native-wechat';
export default class Splash extends React.Component {

  componentDidMount() {
    this.getCurrentPosition();
    WeChat.registerApp('wx5199f2a6aceb216e');
    this.timer = setTimeout(() => {
      const { navigator } = this.props;
       navigator.push({
                name: 'Main',
                component: Home
            });
    }, 1000);
}


componentWillUnmount() {
  clearTimeout(this.timer);
}


/**
获取当前经纬度 百度定位
*/
 getCurrentPosition(){
   Geolocation.getCurrentPosition()
               .then(data => {
                 Storage.save('Geolocation',data);
               })
               .catch(e =>{
                 console.warn(e, 'error');
                this.getSchoolName(0,0);
               })
 }

  render(){
    return (

      <Image source={require('../image/bg.png')}/>);
  }

}
