import React from 'react';
import {
    Text, BackHandler, View, StyleSheet, TouchableOpacity,
    FlatList
} from 'react-native';

var Tools = require('../utils/Tools');
var Theme = require('../utils/Theme');
import * as http from '../utils/RequestUtil';
var page = 1;

export default class OrderList extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            titleData: [],
            refreshing: true
        };
    }

    async getListData() {
        if (Tools.USER) {
            let header = {};
            let parms = '?bigStatus=' + this.props.type + '&page=' + page + '&size=10&userId=' + Tools.USER.userId;
            header = {
                'token': Tools.USER.token,
                'userId': Tools.USER.userId
            };
            console.warn(parms);
            http.require('order' + parms, 'GET', header, null).then((data) => {

                console.warn(JSON.stringify(data));
                if (data.code === 1000) {
                    if (page > 1) {
                        for (var i = 0; i < data.data.length; i++) {
                            this.state.titleData.push(
                                data.data[i]
                            );
                        }
                        this.setState({
                            refreshing: false
                        })
                    } else {
                        this.setState({
                            titleData: data.data,
                            refreshing: false
                        })
                    }

                }
            });
        }

    }

    render() {
        if (!Tools.USER) {
            return (<View flex={1} justifyContent={'center'} alignItems={'center'}><Text style={{ fontSize: 23 }}>点击登录</Text></View>);
        }
        return (
            <FlatList
                paddingTop={10}
                data={this.state.titleData}
                refreshing={this.state.refreshing}
                onEndReached={() => this.onEndReached()}
                onEndReachedThreshold={5}
                initialNumToRender={10}
                ItemSeparatorComponent={() => { return (<View height={10}></View>) }}
                onRefresh={() => this.onRefresh()}
                keyExtractor={(item, index) => index}
                ListFooterComponent={() => { return <View flex={1} alignItems={'center'} justifyContent={'center'}><Text style={{ fontSize: 20 }}>load more ...</Text></View> }}
                renderItem={({ item, i }) => this.itemView(item)}
            />)

    }
    onEndReached() {
        page += 1;
        this.getListData();
    }

    onRefresh() {
        page = 1;
        this.getListData();
    }
    getStatusText(status) {
        switch (status) {
            case 0:
                return (<Text style={{ color: '#6684EA' }}>无效订单</Text>);
            case 1:
                return (<Text style={{ color: '#F12626' }}>未支付</Text>);
            case 2:
                return (<Text style={{ color: '#F12626' }}>支付失败</Text>);
            case 3:
                return (<Text style={{ color: '#08c847' }}>已预约，未洗衣</Text>);
            case 4:
                return (<Text style={{ color: '#08c847' }}>工作中</Text>);
            case 5:
                return (<Text style={{ color: '#999999' }}>已完成</Text>);
            case 6:
                return (<Text style={{ color: '#6684EA' }}>退款申请中</Text>);
            case 7:
                return (<Text style={{ color: '#6684EA' }}>退款申请中</Text>);
            case 8:
                return (<Text style={{ color: '#6684EA' }}>退款失败</Text>);
            case 9:
                return (<Text style={{ color: '#999999' }}>已退款</Text>);
            case 10:
                return (<Text style={{ color: '#999999' }}>订单超时</Text>);
            case 11:
                return (<Text style={{ color: '#999999' }}>支付超时</Text>);
            case 12:
                return (<Text style={{ color: '#999999' }}>订单已取消</Text>);
            case 13:
                return (<Text style={{ color: '#6684EA' }}>拒绝退款</Text>);
        }
    }

    itemView(item) {
        let statusText = this.getStatusText(item.status);
        return (<TouchableOpacity activeOpacity={0.8} onPress={() => this.itemOnclikss(item)}>

            <View style={styles.itemView}>
                <Text style={styles.text1}>{item.baseName}</Text>
                <Text style={styles.text2}>订单号码:{item.orderNo}</Text>
                <View style={styles.botton}>
                    <Text style={styles.text2}>{Tools.timeFormt(item.createTime)}</Text>
                    {statusText}
                </View>
            </View>
        </TouchableOpacity>);

    }
    itemOnclikss(item) {
        this.props.navigation.navigate('OrderDetail', { orderId: item.id })
    }

    componentDidMount() {
        this.getListData();
    }

}
const styles = StyleSheet.create({
    itemView: {
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        paddingBottom: 8
    }
    , text1: {
        fontSize: 15,
        color: '#333333'
    }
    , text2: {
        fontSize: 13,
        color: '#777777'
    }, botton: {
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: 'space-between',
    }
});