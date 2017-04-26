import {
  Alert,
  ToastAndroid,
  Platform
} from 'react-native';
var Dimensions = require('Dimensions');


export var navigator;
export var USER;
export var CURRINTUSER;

export const headers = () => {
  let header = {};
  if (this.USER) {
    header = {
      'token': this.USER.token,
      'userId': this.USER.userId
    };
  }
  return header;
}

export const toastShort = (content, isAlert) => {
  if (isAlert || Platform.OS === 'ios') {
    Alert.alert('提示', content.toString());
  } else {
    ToastAndroid.show(content.toString(), ToastAndroid.SHORT);
  }
};

export const toastLong = (content, isAlert) => {
  if (isAlert || Platform.OS === 'ios') {
    Alert.alert(
      '提示',
      content.toString()
    );
  } else {
    ToastAndroid.show(content.toString(), ToastAndroid.LONG);
  }
};


export const timeFormt = (longTimes) => {
  var date = new Date(longTimes);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return nowTime = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}

//获取屏幕宽度和高度
export const ScreenSize = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}


export const ThemColor = {
  themColor: '#F84A0D'
};
//http://192.168.1.10:8001/api/v1/
export var URL = {
  BASE_URL: 'https://dev.nebulaedu.com/api/v1/',

};
