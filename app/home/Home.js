import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  StatusBar,
} from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import TabBarItem from '../widget/TabBarItem';
import WebScene from '../widget/WebScene'

const lightContentScenes = ['Home', 'Mine']

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

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

// var navigator;

import TitleView from '../commodules/Maintitle';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    StatusBar.setBarStyle('light-content')
    // navigator = this.props;

  }

  render() {
    return (
      <Navigator
        onNavigationStateChange={
          (prevState, currentState) => {
            const currentScene = getCurrentRouteName(currentState);
            const previousScene = getCurrentRouteName(prevState);
            if (previousScene !== currentScene) {
              if (lightContentScenes.indexOf(currentScene) >= 0) {
                StatusBar.setBarStyle('light-content')
              } else {
                StatusBar.setBarStyle('dark-content')
              }
            }
          }
        }
      />
    );
  }
}
const Tab = TabNavigator(
  {
    Index: {
      screen: Index,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '洗衣',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('../image/nav_tab_home_icon.png')}
            selectedImage={require('../image/nav_tab_home_icon.png')}
          />
        )
      }),
    },
    Type: {
      screen: Type,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '话图',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('../image/nav_tab_type_icon.png')}
            selectedImage={require('../image/nav_tab_type_icon.png')}
          />
        )
      }),
    },

    News: {
      screen: News,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '订单',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('../image/nav_tab_new_icon.png')}
            selectedImage={require('../image/nav_tab_new_icon.png')}
          />
        )
      }),
    },

    Us: {
      screen: Us,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('../image/nav_tab_us_icon.png')}
            selectedImage={require('../image/nav_tab_us_icon.png')}
          />
        )
      }),
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
      activeTintColor: Theme.Theme.color,
      inactiveTintColor: '#979797',
      style: { backgroundColor: '#ffffff' },
    },
  }

);

const Navigator = StackNavigator(
  {
    Tab: { screen: Tab },
    Web: { screen: WebScene },
    // GroupPurchase: { screen: GroupPurchaseScene },
  },
  {
    navigationOptions: {
      // headerStyle: { backgroundColor: color.theme }
      headerBackTitle: null,
      headerTintColor: '#333333',
      showIcon: true,
    },
  }
);

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
