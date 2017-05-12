import React  from 'react';

import Home from './home/Home';
var Tools = require('./utils/Tools');
import * as http from './utils/RequestUtil';
import {
    Geolocation
} from 'react-native-baidu-map';
import Storage from './utils/Storage';
import * as WeChat from 'react-native-wechat';
export default class root extends React.Component {
    componentDidMount() {
        this.getCurrentPosition();
        this.checkToken();
        WeChat.registerApp('wx5199f2a6aceb216e');

    }

    checkToken() {
        Storage.get('userIdwithtoken').then((data) => {
            if (data)
                this.getUserInfo(data);
        });
    }


    getUserInfo(data) {
        let header = {};
        if (data) {
            header = {
                'token': data.token,
                'userId': data.userId
            };
        }
        // console.warn(JSON.stringify(data));
        http.require('user/profile', 'GET', header, {'userId': data.userId}).then((result) => {
            // console.warn(JSON.stringify(result));
            Tools.CURRINTUSER = result.data;
            Tools.USER = data;
        });
    }


    /**
     获取当前经纬度 百度定位
     */
    getCurrentPosition() {
        Geolocation.getCurrentPosition()
            .then((data) => {
                // console.warn(JSON.stringify(data));
                Storage.save('Geolocation', data);
            })
            .catch(e => {
                // console.warn(e, 'error');
                this.getSchoolName(0, 0);
            })
    }

    render() {
        return (
            <Home />
        );
    }

}
