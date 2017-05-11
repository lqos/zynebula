import React, { Component } from 'react';

import {
  View,
  BackAndroid,
  Platform,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  DeviceEventEmitter,
  StyleSheet
} from 'react-native';

import { Navigator } from 'react-native-deprecated-custom-components'
var Theme = require('../utils/Theme');
var Tools = require('../utils/Tools');
import Storage from '../utils/Storage';
import TitleView from '../commodules/Maintitle';
import * as http from '../utils/RequestUtil';
var mobile = '18232077504';
var password = '111111';

export default class LogIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'wow',
    };

  }

  render() {
    return (<View>
      <TitleView
        ClickLeft={() => { this.onBackAndroid() }}
        leftIcon={<Image tintColor={'#ffffff'} source={require('../image/nav_finish.png')} />}
        title={'登录'} titleColor={'#ffffff'} />

      <TextInput
        placeholder={'手机号'}
        keyboardType={'numeric'}
        marginTop={30}
        style={styles.TextInputS}
        editable={true}
        underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
        onChangeText={(text) => this.onChangeText(0, text)}
      />
      <TextInput
        placeholder={'密码'}
        marginTop={30}
        underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
        style={styles.TextInputS}
        onChangeText={(text) => this.onChangeText(1, text)} />

      <View style={{ marginTop: 30, alignItems: 'center', flexDirection: 'column', }}>
        <TouchableOpacity style={{ backgroundColor: '#2275fe', borderRadius: 5, alignItems: 'center', justifyContent: 'center', height: 50, width: Tools.ScreenSize.width / 3 * 2 }} activeOpacity={0.8} onPress={() => this.onClick('1')}>
          <Text style={{ color: 'white' }}>登录</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 20, backgroundColor: '#08c847', borderRadius: 5, alignItems: 'center', justifyContent: 'center', height: 50, width: Tools.ScreenSize.width / 3 * 2 }} activeOpacity={0.8} onPress={() => this.onClick('2')}>
          <Text style={{ color: 'white' }} >注册</Text>
        </TouchableOpacity>
      </View>
    </View>);
  }

  onClick(type) {
    Storage.delete('userIdwithtoken');

    let formData = {
      'password': password,
      'accountName': mobile
    };
    http.postJson('user/login', null, {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, formData).then((data) => {
      Tools.toastShort(data.message, false);
      if (data.code === 1000) {
        Tools.USER = data;
        Storage.save('userIdwithtoken', data);
        this.getUserInfo();
      }
    }).catch((error) => {
      Tools.toastShort(error, false);
    });
  }

  onChangeText(type, text) {
    if (type === 0) {
      mobile = text;
    } else if (type === 1) {
      password = text;
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid = () => {
    const { navigator } = this.props;
    const routers = navigator.getCurrentRoutes();
    if (routers.length > 1) {
      navigator.pop();
      return true;
    }
    return false;
  }

  getUserInfo() {
    let header = {};
    if (Tools.USER) {
      header = {
        'token': Tools.USER.token,
        'userId': Tools.USER.userId
      };
    }
    http.require('user/profile', 'GET', header, { 'userId': Tools.USER.userId }).then((data) => {
      Tools.CURRINTUSER = data.data;
      DeviceEventEmitter.emit('login', data.data)
      const { navigator } = this.props;
      navigator.pop();
    });
  }
}

const styles = StyleSheet.create({
  TextInputS: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: Tools.ScreenSize.width / 6,
    marginRight: Tools.ScreenSize.width / 6
  }
});
