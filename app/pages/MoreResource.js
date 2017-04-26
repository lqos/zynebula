import React, { Component } from 'react';
import {
  TouchableHighlight, ListView, Image, Text, Platform, BackAndroid, View, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView,
  RefreshControl,
} from 'react-native';

var Tools = require('../utils/Tools');
var Theme = require('../utils/Theme');
import Cartoon from '../ui/Cartoon';
import Storage from '../utils/Storage';
import * as http from '../utils/RequestUtil';
import TitleView from '../commodules/Maintitle';
import LogUi from '../ui/LogIn';
var page = 1;

export default class MoreResource extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      FloorCardData: null
    };
  }

  async getListData(latitude, longitude) {
    var urt = '';
    if (this.props.dto) {
      urt = '&parentId=' + this.props.dto.id;
    }

    let header = {};
    if (Tools.USER) {
      header = {
        'token': Tools.USER.token,
        'userId': Tools.USER.userId
      };
      urt = urt + '&userId=' + Tools.USER.userId;
    }

    var url = 'product/listByFloorCard?longitude=' + longitude + '&latitude=' + latitude + '&page=' + 1 + '&size=' + (20 * page) + urt;

    http.require(url, 'GET', header, null).then((responseJson) => {
      if (responseJson.code === 1000) {
        this.setState({
          isRefreshing: false,
          FloorCardData: responseJson.data,
        })
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


  _onRefresh() {
    page = 1;
    Storage.get('Geolocation').then(data => {
      this.getListData(data.latitude, data.longitude);
    });
  }

  LookDetail(data) {
    // TODO  如果未登录则跳转登录界面
    // TODO  如果是预约状态或者是使用状态则跳转订单详情页 （是自己使用或者预约）
    const { navigator } = this.props;
    if (Tools.USER) {
      navigator.push({
        name: 'Cartoon',
        component: Cartoon,
        params: {
          dto: data,
          id: data.id
        }
      });
    } else {
      navigator.push({
        title: 'LogUi',
        component: LogUi,
      });
    }
  }

  render() {

    var recommend;
    if (this.state.FloorCardData) {
      recommend = (
        this.state.FloorCardData.map((data, i) => {
          var color = this.getStatusColor(data);
          var Used = this.getUseed(data.collection === 0, '常用');
          var colleced = this.getUseed(data.isUse === 0, '收藏');
          return (
            <TouchableOpacity activeOpacity={0.8} key={i} onPress={() => this.LookDetail(data)}>
              <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#fFffff', marginLeft: 10, marginTop: 10, marginRight: 10 }}>
                <View style={{ backgroundColor: color, width: 3 }} />
                <View style={{ flex: 1, backgroundColor: '#ffffff', marginLeft: 15, paddingTop: 8, paddingBottom: 8 }}>
                  <Text style={{ color: '#000000', fontSize: 15 }}>{data.showName}</Text>
                  <View style={{ alignItems: 'flex-end', flexDirection: 'row', marginTop: 2 }}>
                    <Text style={{ backgroundColor: color, color: '#ffffff', fontSize: 15, padding: 1, borderRadius: 3, paddingRight: 5, paddingLeft: 5 }}>{this.getStatus(data)}</Text>
                    {Used}
                    {colleced}
                    <View style={{ flex: 1, alignItems: 'flex-end' }} >
                      <Text>{data.distance}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>)
        })
      );
    }
    return (
      <View style={styles.container}>
        <TitleView
          ClickLeft={() => { this.onBackAndroid() }}
          leftIcon={<Image tintColor={'#ffffff'} source={require('../image/nav_finish.png')} />}
        />

        <View style={{ backgroundColor: Theme.Theme.color, height: 50 }}>
          <Text style={{ color: '#ffffff', marginLeft: 10 }}>{this.props.dto.showName}</Text>
          <View style={{ flexDirection: 'row', backgroundColor: Theme.Theme.color, marginTop: 3 }}>
            <Text style={{ color: '#b9cae0', marginLeft: 10 }}>洗衣机{this.props.dto.number}台</Text>
            <Text style={{ color: '#b9cae0', marginLeft: 10 }}>空闲{this.props.dto.freeNumber}台</Text>
            <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }} >
              <Text style={{ color: '#b9cae0' }}>{this.props.dto.distance}</Text>
            </View>
          </View>
        </View>
        <ScrollView
          backgroundColor={'#f0ffff'}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => { this._onRefresh(); }}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={[Theme.Theme.color]}
              progressBackgroundColor="#ffffff"
            />
          }
        >
          {recommend}
        </ScrollView>
      </View>)

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
    Storage.get('Geolocation').then(data => {
      this.getListData(data.latitude, data.longitude);
    });
  }

}

const styles = StyleSheet.create({
  titleView: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    height: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  listStyle: {
    flexDirection: 'row', //改变ListView的主轴方向
    flexWrap: 'wrap', //换行
  },
  itemViewStyle: {
    alignItems: 'center', //这里要注意，如果每个Item都在外层套了一个 Touchable的时候，一定要设置Touchable的宽高
    width: Tools.ScreenSize.width / 3,
  },
})
