import {
  Alert,
  ToastAndroid,
  Platform
} from 'react-native';
var Dimensions = require('Dimensions');


export var navigator ;

export const toastShort = (content, isAlert) => {
  if (isAlert || Platform.OS === 'ios') {
    Alert.alert('提示',content.toString());
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

//获取屏幕宽度和高度
export const ScreenSize = {
 width:Dimensions.get('window').width,
 height:Dimensions.get('window').height,
}


export const ThemColor = {
  themColor:'#F84A0D'
};
//http://192.168.1.10:8001/api/v1/
export const URL = {
  BASE_URL:'https://dev.nebulaedu.com/api/v1/',//测试  正式https://nebulaedu.com/api/v1/
  USER:{
    id:288
  }
};
