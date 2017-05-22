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
import * as payDoit from '../ui/payDoit';
var Theme = require('../utils/Theme');
var Tools = require('../utils/Tools');
import * as http from '../utils/RequestUtil';
import TitleView from '../commodules/Maintitle';
import CountTime from '../widget/CountTime';
var checkIndex = -1;
var timeLong = -1;


export default class OrderDetail extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,
    })
    state: {
        orderId: Object,
    }

    constructor(props) {
        super(props);
        this.state = {
            orderData: null,
            timeLength_: 0,
        };
        this.getOrderDetails();
        this.timeLength = 0;
    }

    /**
     * 获取订单详情
     */
    getOrderDetails() {
        let orderId = this.props.navigation.state.params.orderId;
        let header = {
            'token': Tools.USER.token,
            'userId': Tools.USER.userId,
        };
        console.warn(JSON.stringify(header));
        http.require('order/' + orderId, 'GET', header, null).then((data) => {
            console.warn(JSON.stringify(data));
            if (data.code === 1000) {
                this.setState({
                    orderData: data.data,
                });
            }
        }).catch((error) => {
            console.warn(JSON.stringify(error));
        });

    }



    render() {
        let container;
        let buttons;
        if (this.state.orderData) {
            let statusText = this.getStatusText(this.state.orderData.status);
            buttons = this.getStatusButton(this.state.orderData.status);
            container = (<View style={styles.itemView}>
                <View style={styles.botton}>
                    <Text style={{ color: '#333333', fontSize: 14 }}>订单状态:</Text>
                    {statusText}
                </View>

                <View style={styles.botton}>
                    <Text style={styles.text2}>使用地址:</Text>
                    <Text style={styles.text2}>{this.state.orderData.baseName}</Text>
                </View>


                <View style={styles.botton}>
                    <Text style={styles.text2}>实付金额:</Text>
                    <Text style={styles.text2}>{this.state.orderData.amount / 100}元</Text>
                </View>

                <View style={styles.botton}>
                    <Text style={styles.text2}>下单时间:</Text>
                    <Text style={styles.text2}>{Tools.timeFormt(this.state.orderData.createTime)}</Text>

                </View>
                <View style={styles.botton}>
                    <Text style={styles.text2}>订单号码:</Text>
                    <Text style={styles.text2}>{this.state.orderData.orderNo}</Text>

                </View>
            </View>);

        }

        return (
            <View style={styles.container}>
                <TitleView
                    ClickLeft={() => {
                        this.onBackAndroid()
                    }}
                    tintColor={'white'}
                    leftIcon={require('../image/nav_finish.png')}
                    title={'订单详情'} titleColor={'#ffffff'} />
                {container}
                {buttons}

            </View>)
    }


    /**
     生产订单
     */
    onClick(id) {
        Alert.alert(
            '选择支付方式',
            '支付金额为' + 100 + '元',
            [
                { text: '微信', onPress: () => this.onBackAndroid() },
                { text: '支付宝', onPress: () => this.onBackAndroid() },
                { text: '取消订单', onPress: () => this.onBackAndroid() },
            ],
            { cancelable: false }
        );
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


    getStatusButton(status) {
        if (status === 0 || status === 6 || status === 7
            || status === 9 || status === 11 || status === 12) {
            return (<View style={{ alignItems: 'flex-end', flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity style={{
                    backgroundColor: '#08c847',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    width: Tools.ScreenSize.width
                }} activeOpacity={0.8} onPress={() => this.onBackAndroid()}>
                    <Text style={{ color: 'white' }}>返回首页</Text>
                </TouchableOpacity>
            </View>);
        } else if (status === 2 || status === 1) {
            return (
                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text>请在</Text>
                        <CountTime timeText={{ color: 'red', fontSize: 19 }} Times={this.state.orderData.haomiao} timeOut={() => this.getOrderDetails()} />
                        <Text>内完成支付，否则将无法完成订单</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{
                            backgroundColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            width: Tools.ScreenSize.width / 2
                        }} activeOpacity={0.8} onPress={() => this.cancelOrder()}>
                            <Text style={{ color: '#333333' }}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: '#08c847',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            width: Tools.ScreenSize.width / 2
                        }} activeOpacity={0.8} onPress={() => this.makeOder()}>
                            <Text style={{ color: 'white' }}>付款</Text>
                        </TouchableOpacity>
                    </View>
                </View>)
        } else if (status == 3) {
            return (
                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text>请在</Text>
                        <CountTime timeText={{ color: 'red', fontSize: 19 }} Times={this.state.orderData.haomiao} timeOut={() => this.getOrderDetails()} />
                        <Text>内启动洗衣机，否则将取消设备预选状态</Text>
                    </View>

                    <View style={{ alignItems: 'flex-end', flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{
                            backgroundColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            width: Tools.ScreenSize.width / 2
                        }} activeOpacity={0.8} onPress={() => this.refund()}>
                            <Text style={{ color: '#333333' }}>退款</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: '#08c847',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            width: Tools.ScreenSize.width / 2
                        }} activeOpacity={0.8} onPress={() => this.onClick(2)}>
                            <Text style={{ color: 'white' }}>立即启动</Text>
                        </TouchableOpacity>
                    </View>
                </View>)
        } else if (status === 8 || status === 13 || status === 5 || status === 10 || status === 4) {
            let timeContent;

            if (status === 4) {
                timeContent = (<View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Text>您的洗衣服务预计</Text>
                    <Text style={{ color: Theme.Theme.color, fontSize: 19 }}>{this.state.orderData.timeLong} </Text>
                    <Text>分钟 后完成。谢谢您的使用！</Text>
                </View>)


            }


            return (
                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                    {timeContent}
                    <View style={{ alignItems: 'flex-end', flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{
                            backgroundColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            width: Tools.ScreenSize.width / 2
                        }} activeOpacity={0.8} onPress={() => this.refund()}>
                            <Text style={{ color: '#333333' }}>退款</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: '#08c847',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            width: Tools.ScreenSize.width / 2
                        }} activeOpacity={0.8} onPress={() => this.onBackAndroid()}>
                            <Text style={{ color: 'white' }}>返回首页</Text>
                        </TouchableOpacity>
                    </View></View>)
        }
    }




    /**
     * 申请退款
     */
    refund() {

    }

    /**
     * 支付
     */
    makeOder = () => {
        payDoit.orderCheck(this.state.orderData).then(data => {
            payDoit.makePayOrder(1, this.state.orderData).then((data) => {
                this.payWx(data);
            });
        }).catch((errstr) => {
            Tools.toastShort(errstr, true);
        })
    }

    setTime() {
        this.stop();
        this.interval = setInterval(() => {
            this.setState({ timeLength_: this.timeLength-- });
            if (this.state.data <= 0) {
                this._timer && clearInterval(this._timer);
                Tools.toastShort("时间到了", true);
            }
        }, 1000);

    }

    stop() {
        console.warn('stop');
        this.interval && clearInterval(this.interval);
    }



    /**
     *  调用微信支付
     * @param {订单信息} data 
     */
    payWx = (data) => {
        try {
            payDoit.payWx(data).then((data) => {
                Tools.toastShort('支付成功' + data.errCode, false);
                if (data.errCode === 0) {
                    Tools.toastShort('支付成功1', false);
                } else {
                    Tools.toastShort('支付失败2', false);
                }
            }).catch((error) => {
                Tools.toastShort('支付失败3', false);
            });
        } catch (error) {
            Tools.toastShort('支付失败4' + error, false);
        }
    }

    /**
     * 取消订单
     */
    cancelOrder() {
        let url = 'order/cancelPay';
        let header = {};
        header = {
            'token': Tools.USER.token,
            'userId': Tools.USER.userId
        };
        http.require(url + '?userId=' + Tools.USER.userId + '&orderSn=' + this.state.orderData.orderNo, 'GET', header, null)
            .then((data) => {
                if (data.code === 1000) {
                    Tools.toastShort("订单已取消", false);
                } else {
                    Tools.toastShort(data.message, false);
                }
            }).catch((error) => {
                Tools.toastShort('订单取消失败', false);
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
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f0ffff',
    },

    itemView: {
        backgroundColor: 'white',
        margin: 15,
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
        fontSize: 14,
        color: '#777777'
    }, botton: {
        marginTop: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }

})