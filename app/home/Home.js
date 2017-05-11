import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  StatusBar,
} from 'react-native';

import { Navigator } from 'react-native-deprecated-custom-components'
import TabNavigator from 'react-native-tab-navigator';

import Index from '../pages/Index';
import Type from '../pages/Type';
import News from '../pages/News';
import Us from '../pages/Us';


var Theme = require('../utils/Theme');


const HOME = '首页';
const HOME_NORMAL = require('../image/nav_tab_home_icon.png');
const HOME_FOCUS = require('../image/nav_tab_home_icon.png');

const CATEGORY = '分类';
const CATEGORY_NORMAL = require('../image/nav_tab_type_icon.png');
const CATEGORY_FOCUS = require('../image/nav_tab_type_icon.png');


const CART = '广场';
const CART_NORMAL = require('../image/nav_tab_new_icon.png');
const CART_FOCUS = require('../image/nav_tab_new_icon.png');

const PERSONAL = '我的';
const PERSONAL_NORMAL = require('../image/nav_tab_us_icon.png');
const PERSONAL_FOCUS = require('../image/nav_tab_us_icon.png');

var navigator;

import TitleView from '../commodules/Maintitle';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    navigator = this.props;
    this.state = {
      title: '首页',
      selectedTab: HOME,
    };
  }

  render() {
    return (
      <View style={styles.contain}>
        <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
          {this._renderTabItem(HOME_NORMAL, HOME_FOCUS, HOME, Home._createChildView(HOME, 0))}
          {this._renderTabItem(CATEGORY_NORMAL, CATEGORY_FOCUS, CATEGORY, Home._createChildView(CATEGORY, 1))}
          {this._renderTabItem(CART_NORMAL, CART_FOCUS, CART, Home._createChildView(CART, 2))}
          {this._renderTabItem(PERSONAL_NORMAL, PERSONAL_FOCUS, PERSONAL, Home._createChildView(PERSONAL, 3))}
        </TabNavigator>
      </View>
    );
  }

  _renderTabItem(img, selectedImg, tag, childView) {
    return (
      <TabNavigator.Item
        title={tag}
        selected={this.state.selectedTab === tag}
        titleStyle={{ fontSize: 13 }}
        selectedTitleStyle={{ fontSize: 14, color: Theme.Theme.color }}
        renderIcon={() => <Image style={styles.tabIconNormal} source={img} />}
        renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg} />}
        onPress={() => this.setState({ selectedTab: tag })}>
        {childView}
      </TabNavigator.Item>
    );
  }
  static _createChildView(tag, index) {

    var contains;
    var title = (<TitleView title={tag} titleColor='#ffffff' />);
    switch (index) {
      case 0: contains = <Index {...navigator} />;
        break;
      case 1: contains = <Type {...navigator} />;
        break;
      case 2: contains = <News {...navigator} />;
        break;
      case 3: contains = <Us {...navigator} />;
        title = null;
        break;

    }
    return (
      <View style={{ marginTop: 0.31, backgroundColor: '#ffffff', flex: 1 }}>
        {title}
        {contains}
      </View>
    );
  }
}

const styles = StyleSheet.create({

  contain: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'gray',
  },
  titleView: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    height: 50,
    marginBottom: 1
  }, tab_item: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 2,
    paddingBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 0.31,
    backgroundColor: '#ffffff',
  }, tab: {
    height: 52,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  tabIcon: {
    tintColor: Theme.Theme.color,
    resizeMode: 'stretch',
    marginTop: 12.5
  },
  tabIconNormal: {
    resizeMode: 'stretch',
    marginTop: 12.5
  }
});
