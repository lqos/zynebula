
var Tools = require('../utils/Tools');
import * as http from '../utils/RequestUtil';
import * as WeChat from 'react-native-wechat';

//




/**
   生产支付业务订单
   */
export const orderCheck = (data) => {
    let header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': Tools.USER.token,
        'userId': Tools.USER.userId
    };
    console.warn(JSON.stringify(data));
    return new Promise((resolve, reject) => {
        http.require('order/check?userId=' + Tools.USER.userId + '&orderId=' + data.id, 'GET', header, null)
            .then((data) => {
                if (1000 === data.code) {
                    resolve(data.data);
                }
                else {
                    reject(data.message);
                }
            }).catch((error) => {
                reject(error);
            });
    });

}

/**
   生产支付业务订单
   */
export const makePayOrder = (id, data) => {
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

        return new Promise((resolve, reject) => {
            http.paypostJson('charge/order', null, header, param)
                .then((data) => {
                    resolve(data.data);
                }).catch((error) => {
                    reject(error);
                });
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

        return new Promise((resolve, reject) => {
            http.paypostJson('charge/order', null, header, param)
                .then((data) => {
                    resolve(data.data);
                }).catch((error) => {
                    reject(error);
                });
        });
    }

}


/**
    调用微信支付
    */
export const payWx = (data) => {
    console.warn(JSON.stringify(data));
    let bean = {
        partnerId: data.partnerid, // 商家向财付通申请的商家id
        prepayId: data.prePayId,//'1411270102', // 预支付订单
        nonceStr: data.nonceStr, // 随机串，防重发
        timeStamp: data.timeStamp, // 时间戳，防重发
        package: 'Sign=WXPay', // 商家根据财付通文档填写的数据和签名
        sign: data.paySign// 商家根据微信开放平台文档对数据做的签名
    }
    return WeChat.pay(bean);
}
