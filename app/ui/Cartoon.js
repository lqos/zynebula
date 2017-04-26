import React, { Component } from 'react';

import {
  View,
  BackAndroid,
  Platform,
  Navigator,
  ListView,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  StyleSheet
} from 'react-native';
var Theme = require('../utils/Theme');
var Tools = require('../utils/Tools');
import Storage from '../utils/Storage';
import * as http from '../utils/RequestUtil';
var id;
import AlterA from '../commodules/AlterA';
import TitleView from '../commodules/Maintitle';
var checkIndex = -1;
var modeData;
import * as WeChat from 'react-native-wechat';

export default class Cartoon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      packageData: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    };
    //
  }

  /***
  首页附近洗衣机点列表
  **/
  async getFloorCard(id) {
    var url = 'product/package?productId=' + id;
    checkIndex = -1;
    http.require(url, 'GET', null).then((responseJson) => {
      if (responseJson.code === 1000) {
        console.warn(JSON.stringify(responseJson));
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          packageData: ds.cloneWithRows(responseJson.data),
        });
      }
    });

  }


  getStatus(data) {

    if (data.onOffStatus === 0) {
      return '离线';
    }
    if (data.washStatus === 2) {
      return ("空闲");
    } else if (data.washStatus === 1 || data.washStatus === 3) {
      return (data.washStatus === 1 ? "使用中" : "已预约");
    } else {
      return "未知";
    }
  }


  getStatusColor(data) {

    if (data.onOffStatus === 0) {
      return '#EE1F09';
    }
    if (data.washStatus === 2) {
      return '#08c847';
    } else if (data.washStatus === 1 || data.washStatus === 3) {
      return '#EE1F09';;
    } else {
      return '#EE1F09';
    }
  }

  getUseed(is, tag) {
    if (is) {
      return null;
    }

    return (<Text style={{ backgroundColor: '#5A97F3', color: '#ffffff', fontSize: 15, marginLeft: 10, padding: 1, paddingRight: 5, paddingLeft: 5, borderRadius: 3 }}>{tag}</Text>);
  }


  render() {
    var topView;
    if (this.props.dto) {

      var color = this.getStatusColor(this.props.dto);
      var Used = this.getUseed(this.props.dto.collection === 0, '常用');
      var colleced = this.getUseed(this.props.dto.isUse === 0, '收藏');
      topView = (

        <View style={{ flexDirection: 'row', backgroundColor: '#fFffff', marginLeft: 25, marginTop: -25, marginRight: 25 }}>
          <View style={{ backgroundColor: color, width: 3, }} />
          <View style={{ flex: 1, backgroundColor: '#ffffff', marginLeft: 15, paddingTop: 8, paddingBottom: 8 }}>
            <Text style={{ color: '#000000', fontSize: 15 }}>{this.props.dto.showName}</Text>
            <View style={{ alignItems: 'flex-end', flexDirection: 'row', marginTop: 2 }}>
              <Text style={{ backgroundColor: color, color: '#ffffff', fontSize: 15, padding: 1, borderRadius: 3, paddingRight: 5, paddingLeft: 5 }}>{this.getStatus(this.props.dto)}</Text>
              {Used}
              {colleced}
              <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }} >
                <Text>{this.props.dto.distance}</Text>
              </View>
            </View>
          </View>
        </View>

      );
    }
    return (
      <View style={styles.container}>
        <TitleView
          ClickLeft={() => { this.onBackAndroid() }}
          leftIcon={<Image tintColor={'#ffffff'} source={require('../image/nav_finish.png')} />}
          title={'洗衣机'} titleColor={'#ffffff'} />

        <View style={{ backgroundColor: Theme.Theme.color, height: 35 }}>
        </View>
        {topView}

        <ListView
          margin={25}
          dataSource={this.state.packageData}
          renderRow={(data) => this.getPackageView(data)}
        />


        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', justifyContent: 'center' }} activeOpacity={0.8}>
          <Text>最后消毒时间：{Tools.timeFormt(this.props.dto.lastCleanTime)}</Text>
        </View>
        <View style={{ alignItems: 'flex-end', flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity style={{ backgroundColor: '#2275fe', alignItems: 'center', justifyContent: 'center', height: 50, width: Tools.ScreenSize.width / 2 }} activeOpacity={0.8} onPress={() => this.onClick(1)}>
            <Text style={{ color: 'white' }}>预约使用</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#08c847', alignItems: 'center', justifyContent: 'center', height: 50, width: Tools.ScreenSize.width / 2 }} activeOpacity={0.8} onPress={() => this.onClick(2)}>
            <Text style={{ color: 'white' }} >立即使用</Text>
          </TouchableOpacity>
        </View>
      </View>)
  }

  getPackageView(data) {
    if (checkIndex === -1) {
      checkIndex = (data.id);
    }
    var check = require('../image/nocheck_de.png');
    if (data.id === checkIndex) {
      check = require('../image/check_ed.png');
    }
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => this.onselect(data.id)}>
        <View style={{ alignItems: 'center', flexDirection: 'row', padding: 8, backgroundColor: '#ffffff', marginTop: 0.6 }}>
          <Image source={{ uri: data.icon }} style={{ width: 30, height: 30, marginRight: 5, }} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 16, color: '#000000' }}>{data.name}</Text>
            <Text style={{ fontSize: 12 }}>{data.desp}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}>
            <Text>{data.spend / 100}元</Text>
            <Image source={check} style={{ width: 20, height: 20, marginLeft: 10 }} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  onselect(id) {
    checkIndex = id;
    this.setState({
    });
  }
  /**
  生产订单
  */
  onClick(id) {
    if (checkIndex === -1) {
      Tools.toastShort('请选择洗衣模式', false);
      return;
    }
    let url = '';
    if (id === 2) {
      url = "order";
    } else {
      url = "order/appointment";
    }
    let header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    if (Tools.USER) {
      header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': Tools.USER.token,
        'userId': Tools.USER.userId
      };
    }
    http.require(url + '?userId=' + Tools.USER.userId + '&productId=' + this.props.id + '&packageId=' + checkIndex, 'POST', header, null)
      .then((data) => {
        if (data.code === 1000) {
          Alert.alert(
            '选择支付方式',
            '支付金额为' + data.data.spend / 100 + '元',
            [
              { text: '微信', onPress: () => this.makePayOrder(1, data.data) },
              { text: '支付宝', onPress: () => this.makePayOrder(2, data.data) },
              { text: '取消订单', onPress: () => this.cancelOrder(data.data) },
            ],
            { cancelable: false }
          );
        } else {
          Tools.toastShort(data.message, false);
        }
      });
  }

  /**
  生产支付业务订单
  */
  makePayOrder(id, data) {
    let header = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    if (Tools.USER) {
      header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': Tools.USER.token,
        'userId': Tools.USER.userId
      };
    }
    if (id === 2) {
      let param = {
        'appId': data.p_appId,
        'orderSn': data.orderNo,
        'subject': '星云社区洗衣消费',
        'body': '星云社区洗衣消费',
        'amount': data.spend + '',
        'channel': 'alipay'
      };
      http.paypostJson('charge/order', null, header, param)
        .then((data) => {
          this.cancelOrder(data);
          this.toPay(id, data);
          console.warn(JSON.stringify(data));
        });
    } else {
      let param = {
        'appId': data.p_appId,
        'orderSn': data.orderNo,
        'subject': '星云社区洗衣消费',
        'body': '星云社区洗衣消费',
        'amount': data.spend + '',
        'channel': 'wx'
      };
      http.paypostJson('charge/order', null, header, param)
        .then((data) => {
          this.payWx(data.data);
        });
    }

  }

  /**
  调用未知支付
  */
  async payWx(data) {
    console.warn(JSON.stringify(data));
    let bean = {
      partnerId: data.partnerid, // 商家向财付通申请的商家id
      prepayId: data.prePayId,//'1411270102', // 预支付订单
      nonceStr: data.nonceStr, // 随机串，防重发
      timeStamp: data.timeStamp, // 时间戳，防重发
      package: 'Sign=WXPay', // 商家根据财付通文档填写的数据和签名
      sign: data.paySign// 商家根据微信开放平台文档对数据做的签名
    };
    try {
      WeChat.pay(bean).then((data) => {
        if (data.errCode === 0) {
          Tools.toastShort('支付成功', false);
        } else {
          Tools.toastShort('支付失败', false);
        }
      }).catch((error) => {
        Tools.toastShort('支付失败', false);
      });
    } catch (error) {
      Tools.toastShort('支付失败', false);
    }
  }

  /**
  取消订单
  */
  cancelOrder(data) {
    let url = 'order/cancelPay';
    let header = {};
    if (Tools.USER) {
      header = {
        'token': Tools.USER.token,
        'userId': Tools.USER.userId
      };
    }
    http.require(url + '?userId=' + Tools.USER.userId + '&orderSn=' + data.orderNo, 'GET', header, null)
      .then((data) => {
        if (data.code === 1000) {
        } else {
          Tools.toastShort(data.message, false);
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
  componentDidMount() {
    if (this.props.dto.onOffStatus == 0 || this.props.dto.washStatus != 2) {
      Alert.alert(
        '提示',
        '洗衣机当前为' + this.getStatus(this.props.dto) + '状态，请选择其他空闲设备！',
        [
          { text: 'OK', onPress: () => this.onBackAndroid() },
        ],
        { cancelable: false }
      );
    } else {
      this.getFloorCard(this.props.id);
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f0ffff',
  },
})
