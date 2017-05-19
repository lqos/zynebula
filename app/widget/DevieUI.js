/**
 * Created by Administrator on 2017/5/16 0016.
 */

'use strict';
import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity
}
    from 'react-native';
var Theme = require('../utils/Theme');
var Tools = require('../utils/Tools');

export default class DevieUI extends Component {

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
        var color = this.getStatusColor(this.props.data);
        var Used = this.getUseed(this.props.data.collection === 0, '常用');
        var colleced = this.getUseed(this.props.data.isUse === 0, '收藏');
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={this.props.onPress}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: '#fFffff',
                    marginLeft: 10,
                    marginTop: 8,
                    marginRight: 10
                }}>
                    <View style={{backgroundColor: color, width: 3}}/>
                    <View style={{
                        flex: 1,
                        backgroundColor: '#ffffff',
                        marginLeft: 15,
                        paddingTop: 8,
                        paddingBottom: 8
                    }}>
                        <Text style={styles.labeStyle}>{this.props.data.showName}</Text>
                        <View style={{alignItems: 'flex-end', flexDirection: 'row', marginTop: 2}}>
                            <Text style={{
                                backgroundColor: color,
                                color: '#ffffff',
                                fontSize: 15,
                                padding: 1,
                                borderRadius: 3,
                                paddingRight: 5,
                                paddingLeft: 5
                            }}>{this.getStatus(this.props.data)}</Text>
                            {Used}
                            {colleced}
                            <View style={{flex: 1, alignItems: 'flex-end', marginRight: 10}}>
                                <Text>{this.props.data.distance}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

}
const styles = StyleSheet.create({
    labeStyle: {
        color: '#333333',
        fontSize: 16,
    },
});