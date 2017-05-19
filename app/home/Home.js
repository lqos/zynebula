import React from 'react';
import {
    StyleSheet,
    StatusBar,
    BackHandler
} from 'react-native';
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import TabBarItem from '../widget/TabBarItem';
import WebScene from '../widget/WebScene'
import MoreResource from '../pages/MoreResource'
import OrderDetail from '../pages/OrderDetail';
import Cartoon from  '../ui/Cartoon';
import Login from  '../ui/LogIn';

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


export default class Home extends React.Component {

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }

  onBackAndroid = () => {
BackHandler.exitApp();
    return true;
  }
    constructor(props) {
        super(props);
        StatusBar.setBarStyle('light-content')

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
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '洗衣',
                tabBarIcon: ({focused, tintColor}) => (
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
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '话图',
                tabBarIcon: ({focused, tintColor}) => (
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
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '订单',
                tabBarIcon: ({focused, tintColor}) => (
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
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '我的',
                tabBarIcon: ({focused, tintColor}) => (
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
            style: {backgroundColor: '#ffffff'},
        },
    }
);

const Navigator = StackNavigator(
    {
        Tab: {screen: Tab},
        Web: {screen: WebScene},
        Cartoon: { screen: Cartoon },
        Login: { screen: Login },
        MoreResource: { screen: MoreResource },
        OrderDetail:{screen: OrderDetail}
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
});
