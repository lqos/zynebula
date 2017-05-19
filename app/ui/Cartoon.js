import React, { Component } from 'react';

import {
    View,
    Platform,
    ListView,
    TouchableOpacity,
    Text,
    Alert,
    Image,
    BackHandler,
    StyleSheet
} from 'react-native';
var Theme = require('../utils/Theme');
var Tools = require('../utils/Tools');
import * as http from '../utils/RequestUtil';
import TitleView from '../commodules/Maintitle';
import * as payDoit from '../ui/payDoit';
var checkIndex = -1;
import * as WeChat from 'react-native-wechat';

export default class Cartoon extends React.Component {
    state: {
        data: Object,
    }
    static navigationOptions = ({ navigation }) => ({
        header: null,
    })


    constructor(props) {
        super(props);
        let info = this.props.navigation.state.params.data;
        console.warn(JSON.stringify(info))
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
        let header = {};
        if (Tools.USER) {
            header = {
                'token': Tools.USER.token,
                'userId': Tools.USER.userId
            };
        }
        console.warn(url);
        http.require(url, 'GET', header, null).then((responseJson) => {
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
            return '#EE1F09';
            ;
        } else {
            return '#EE1F09';
        }
    }

    getUseed(is, tag) {
        if (is) {
            return null;
        }
        return (<Text style={{
            backgroundColor: '#5A97F3',
            color: '#ffffff',
            fontSize: 15,
            marginLeft: 10,
            padding: 1,
            paddingRight: 5,
            paddingLeft: 5,
            borderRadius: 3
        }}>{tag}</Text>);
    }


    render() {
        let info = this.props.navigation.state.params.data;
        var topView;
        if (info) {

            var color = this.getStatusColor(info);
            var Used = this.getUseed(info.collection === 0, '常用');
            var colleced = this.getUseed(info === 0, '收藏');
            topView = (

                <View style={{
                    flexDirection: 'row',
                    backgroundColor: '#fFffff',
                    marginLeft: 25,
                    marginTop: -25,
                    marginRight: 25
                }}>
                    <View style={{ backgroundColor: color, width: 3, }} />
                    <View
                        style={{ flex: 1, backgroundColor: '#ffffff', marginLeft: 15, paddingTop: 8, paddingBottom: 8 }}>
                        <Text style={{ color: '#000000', fontSize: 15 }}>{info.showName}</Text>
                        <View style={{ alignItems: 'flex-end', flexDirection: 'row', marginTop: 2 }}>
                            <Text style={{
                                backgroundColor: color,
                                color: '#ffffff',
                                fontSize: 15,
                                padding: 1,
                                borderRadius: 3,
                                paddingRight: 5,
                                paddingLeft: 5
                            }}>{this.getStatus(info)}</Text>
                            {Used}
                            {colleced}
                            <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}>
                                <Text>{info.distance}</Text>
                            </View>
                        </View>
                    </View>
                </View>

            );
        }
        return (
            <View style={styles.container}>
                <TitleView
                    ClickLeft={() => {
                        this.onBackAndroid()
                    }}
                    tintColor={'white'}
                    leftIcon={require('../image/nav_finish.png')}
                    title={'洗衣机'} titleColor={'#ffffff'} />

                <View style={{ backgroundColor: Theme.Theme.color, height: 35 }}>
                </View>
                {topView}

                <ListView
                    margin={25}
                    dataSource={this.state.packageData}
                    renderRow={(data) => this.getPackageView(data)}
                />


                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', justifyContent: 'center' }}
                    activeOpacity={0.8}>
                    <Text>最后消毒时间：{Tools.timeFormt(info.lastCleanTime)}</Text>
                </View>
                <View style={{ alignItems: 'flex-end', flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                    <TouchableOpacity style={{
                        backgroundColor: '#2275fe',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        width: Tools.ScreenSize.width / 2
                    }} activeOpacity={0.8} onPress={() => this.onClick(1)}>
                        <Text style={{ color: 'white' }}>预约使用</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: '#08c847',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        width: Tools.ScreenSize.width / 2
                    }} activeOpacity={0.8} onPress={() => this.onClick(2)}>
                        <Text style={{ color: 'white' }}>立即使用</Text>
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
                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    padding: 8,
                    backgroundColor: '#ffffff',
                    marginTop: 0.6
                }}>
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
        this.setState({});
    }

    /**
     生产订单
     */
    onClick(id) {
        if (!Tools.USER) {
            return;
        }
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
            'Content-Type': 'application/json',
            'token': Tools.USER.token,
            'userId': Tools.USER.userId
        };

        let info = this.props.navigation.state.params.data;
        let htts = url + '?userId=' + Tools.USER.userId + '&productId=' + info.id + '&packageId=' + checkIndex;

        http.postJson(htts, null, header, null)
            .then((data) => {
                console.warn(JSON.stringify(data));
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
    makePayOrder(id, orderData) {
       payDoit.orderCheck(orderData).then(data => {
            payDoit.makePayOrder(id, orderData).then((data) => { 
                this.payWx(data); 
            });
        }).catch((errstr)=>{
            Tools.toastShort(errstr,true);
        })
    }

    /**
     调用微信支付
     */
    payWx(data) {
        try {
            payDoit.payWx(data).then((data) => {
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
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        const { goBack } = this.props.navigation;
        goBack();
        return true;
    }

    componentDidMount() {
        let info = this.props.navigation.state.params.data;
        if (info.onOffStatus === 0 || info.washStatus !== 2) {
            Alert.alert(
                '提示',
                '洗衣机当前为' + this.getStatus(info) + '状态，请选择其他空闲设备！',
                [
                    {
                        text: 'OK', onPress: () => {
                            const { goBack } = this.props.navigation;
                            goBack();
                        }
                    },
                ],
                { cancelable: false }
            );
        } else {
            this.getFloorCard(info.id);
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
