import React, { Component } from 'react';

import {
  View,
  BackAndroid,
  Platform,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  StyleSheet
} from 'react-native';

import { Navigator } from 'react-native-deprecated-custom-components'
import * as WeChat from 'react-native-wechat';
var Theme = require('../utils/Theme');
var Tools = require('../utils/Tools');
var id;

export default class SetUi extends React.Component {

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
          <Text style={{ color: '#333333', fontSize: 18, marginRight: 5 }}>  设置 </Text>

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

        <TouchableOpacity onPress={() => this.share()}>
          <View style={styles.lineStyle}>
            <Image source={require('../image/us_set.png')} />
            <Text style={styles.line_text}>
              推广应用
                 </Text>
            <Image source={require('../image/icon_enter.png')} />
          </View>
        </TouchableOpacity>
        <View style={styles.line} />

      </View>)
  }

  setTabindex(v) {


  }
  share() {
    Alert.alert(
      '',
      '分享给朋友',
      [
        { text: '朋友圈', onPress: () => this.handleShareWeixinCircle() },
        { text: '微信好友', onPress: () => this.handleShareWeixinFriend() },
        { text: '取消' },
      ],
      { cancelable: false }
    );
  }

  /**
* [分享到朋友圈]
* @param  {[Object]} opt 入参对象
* @example { thumbImage:'', title: '', webpageUrl: '' }
*/
  async handleShareWeixinCircle(opt) {
    /* 异步操作锁 */
    var result = await WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          WeChat.shareToTimeline({
            title: '微信朋友圈测试链接',
            description: '分享自:江清清的技术专栏(www.lcode.org)',
            thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
            type: 'news',
            webpageUrl: 'http://www.lcode.org'
          }).then((data) => {
            if (data.errCode === 0) {
              Tools.toastShort('分享成功', false);
            }
            console.warn(JSON.stringify(data));
          })
            .catch((error) => {
              Tools.toastShort(error.message, false);
            });
        } else {
          Tools.toastShort('没有安装微信软件，请您安装微信之后再试', false);
        }
      });
  }

  /**
   * [分享给微信好友或微信群]
   * @param  {[Object]} opt 入参对象
   * @example { thumbImage:'', title: '', webpageUrl: '' }
   */
  async handleShareWeixinFriend(opt) {
    /* 异步操作锁 */
    var result = WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          WeChat.shareToSession({
            title: '微信好友测试链接',
            description: '分享自:江清清的技术专栏(www.lcode.org)',
            thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
            type: 'news',
            webpageUrl: 'http://www.lcode.org'
          }).then((data) => {
            if (data.errCode === 0) {
              Tools.toastShort('分享成功', false);
            }
            console.warn(JSON.stringify(data));
          }).catch((error) => {
            Tools.toastShort(error.message, false);
          });
        } else {
          Tools.toastShort('没有安装微信软件，请您安装微信之后再试', false);
        }
      });
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
