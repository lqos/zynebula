import React, { Component } from 'react';

import {
  View,
  BackAndroid,
  Platform,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
} from 'react-native';
var Theme = require('../utils/Theme');
var Tools = require('../utils/Tools');
var id;
import { Navigator } from 'react-native-deprecated-custom-components'
export default class MessageUI extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'wow',
    };
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.titleView} >
          <TouchableOpacity onPress={this.onBackAndroid}>
            <Image style={{ tintColor: Theme.Theme.color }} source={require('../image/nav_finish.png')} />
          </TouchableOpacity>
          <Text style={{ color: '#333333', fontSize: 18, marginRight: 15 }}>我的消息</Text>

          <Text style={{ color: '#333333', fontSize: 18 }}></Text>

        </View>

        <TouchableOpacity onPress={() => this.setTabindex(1)}>
          <View style={styles.lineStyle}>
            <Image source={require('../image/us_reader_icon.png')} />
            <Text style={styles.line_text}>
              订购记录
                 </Text>
            <Image source={require('../image/icon_enter.png')} />
          </View>
        </TouchableOpacity>

        <View style={styles.line} />

        <TouchableOpacity onPress={() => this.setTabindex(2)}>
          <View style={styles.lineStyle}>
            <Image source={require('../image/us_message_icon.png')} />
            <Text style={styles.line_text}>
              消息
                   </Text>
            <Image source={require('../image/icon_enter.png')} />
          </View>
        </TouchableOpacity>

        <View style={styles.line} />


        <TouchableOpacity onPress={() => this.setTabindex(3)}>
          <View style={styles.lineStyle}>
            <Image source={require('../image/us_cache_icon.png')} />
            <Text style={styles.line_text}>
              离线缓存
                 </Text>
            <Image source={require('../image/icon_enter.png')} />
          </View>
        </TouchableOpacity>


        <View style={styles.line} />

        <TouchableOpacity onPress={() => this.setTabindex(4)}>
          <View style={styles.lineStyle}>
            <Image source={require('../image/us_jilu_icon.png')} />
            <Text style={styles.line_text}>
              观看记录
                 </Text>
            <Image source={require('../image/icon_enter.png')} />
          </View>
        </TouchableOpacity>


        <View style={styles.line} />


        <TouchableOpacity onPress={() => this.setTabindex(5)}>
          <View style={styles.lineStyle}>
            <Image source={require('../image/us_shou_icon.png')} />
            <Text style={styles.line_text}>
              收藏
                 </Text>
            <Image source={require('../image/icon_enter.png')} />
          </View>
        </TouchableOpacity>


        <View style={styles.line} />


        <TouchableOpacity onPress={() => this.setTabindex(6)}>
          <View style={styles.lineStyle}>
            <Image source={require('../image/us_jifen_icon.png')} />
            <Text style={styles.line_text}>
              我的积分
                 </Text>
            <Image source={require('../image/icon_enter.png')} />
          </View>
        </TouchableOpacity>


        <View style={styles.line} />

        <TouchableOpacity onPress={() => this.setTabindex(7)}>
          <View style={styles.lineStyle}>
            <Image source={require('../image/us_set.png')} />
            <Text style={styles.line_text}>
              设置
                 </Text>
            <Image source={require('../image/icon_enter.png')} />
          </View>
        </TouchableOpacity>
        <View style={styles.line} />

      </View>)
  }

  setTabindex(v) {

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




}


const styles = StyleSheet.create({
  titleView: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    height: 50,
    marginBottom: 4
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ECECEC',
  }, line: {
    height: 0.8,
    marginLeft: 13,
    backgroundColor: '#ECECEC'
  },
  lineStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    backgroundColor: 'white',
  },
  line_text: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1
  }
})
