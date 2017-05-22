import React, { Component } from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,
    BackHandler,
    FlatList
} from 'react-native';

import * as http from '../utils/RequestUtil';
import OrderList from '../ui/OrderList';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
var Tools = require('../utils/Tools');
var Theme = require('../utils/Theme');

export default class Type extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,
    })

    constructor(props) {
        super(props);
        this.state = {
            titleData: [],
        };
        this.getTitleList();
    }

    getTitleList() {
        let header = {};
        if (Tools.USER) {
            header = {
                'token': Tools.USER.token,
                'userId': Tools.USER.userId
            };
        }
        http.require('order/category', 'GET', header, null).then((data) => {
            // console.warn(JSON.stringify(data));
            this.setState({
                titleData: data.data,
            })
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    renderTabBar={() => (
                        <DefaultTabBar tabStyle={styles.tab} textStyle={styles.tabText} />
                    )}
                    tabBarBackgroundColor={'#ffffff'}
                    tabBarActiveTextColor={Theme.Theme.color}
                    tabBarInactiveTextColor={'#333333'}
                    tabBarTextStyle={{ fontSize: 15 }}
                    tabBarPosition={'top'}
                    scrollWithoutAnimation={false}
                    tabBarUnderlineStyle={styles.tabBarUnderline}
                    ref={(tabView) => {
                        this.tabView = tabView;
                    }}
                >
                    {this.state.titleData.map((data, i) => {
                        return <OrderList {...this.props} key={i} tabLabel={data.name} type={data.id} />;
                    })
                    }
                </ScrollableTabView>
            </View>
        );
    }

    itemOnclik(item) {
        this.props.navigation.navigate('OrderDetail', {})
    }

    toLogin = () => {
        this.props.navigation.navigate('Login', {})
    }

    renderContent(data, i) {
        let datas = this.getOrderData(data.id, 1);


        return (
            <FlatList
                key={i} tabLabel={data.name}
                data={datas}
                initialNumToRender={10}
                keyExtractor={(item, index) => { return index }}
                renderItem={({ item }) => <Text>{item.baseName}</Text>}
            />
        );
    }

    onRefresh() {
        Tools.toastShort('onRefresh', false)
    }
    onEndReached() {
        Tools.toastShort('onEndReached', false)
    }
    //
    getOrderData(type, page) {

        if (Tools.USER) {
            let header = {};
            let parms = '?bigStatus=' + type + '&page=' + page + '&size=10&userId=' + Tools.USER.userId;
            header = {
                'token': Tools.USER.token,
                'userId': Tools.USER.userId
            };
            http.require('order' + parms, 'GET', header, null).then((data) => {

                console.warn(JSON.stringify(data));
                if (data.code === 1000) {
                    return data.data;
                }
            });
        }


    }



}
const styles = StyleSheet.create({
    base: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: Platform.OS === 'ios' ? 10 : 0
    },
    refreshControlBase: {
        backgroundColor: 'transparent'
    },
    tab: {
        paddingBottom: 0
    },
    tabText: {
        fontSize: 16
    },
    tabBarUnderline: {
        backgroundColor: Theme.Theme.color,
        height: 3
    }, listView: {
        backgroundColor: '#eeeeec'
    },
});