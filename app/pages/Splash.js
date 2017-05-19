import React, { Component } from 'react';
import {
  Image,BackHandler
} from 'react-native';

import Home from '../home/Home';
var Tools = require('../utils/Tools');
import * as http from '../utils/RequestUtil';
import {
  Geolocation
} from 'react-native-baidu-map';
import Storage from '../utils/Storage';
import * as WeChat from 'react-native-wechat';
export default class Splash extends React.Component {

  componentDidMount() {
    this.getCurrentPosition();
    this.checkToken();
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

  checkToken() {
    Storage.get('userIdwithtoken').then((data) => {
      this.getUserInfo(data);
    });
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


  getUserInfo(data) {
    let header = {};
    if (data) {
      header = {
        'token': data.token,
        'userId': data.userId
      };
    }
    http.require('user/profile', 'GET', header, { 'userId': data.userId }).then((result) => {
      Tools.CURRINTUSER = result.data;
      const { navigator } = this.props;
      navigator.pop();
      Tools.USER = data;
    });
  }


  /**
  获取当前经纬度 百度定位
  */
  getCurrentPosition() {
    Geolocation.getCurrentPosition()
      .then((data) => {
        // console.warn(JSON.stringify(data));
        Storage.save('Geolocation', data);
      })
      .catch(e => {
        // console.warn(e, 'error');
        this.getSchoolName(0, 0);
      })
  }

  render() {
    return (<Image source={require('../image/bg.png')} />);
  }

}
