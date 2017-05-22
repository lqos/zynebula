/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */




import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
var Tools = require('../utils/Tools');
export default class CountTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.Times
        }
        this._index = 0;
        this._timer = null;

    }
    countTime() { 
        this.stopTime()
        this._timer = setInterval(() => {
            this._index-=1000     
            if (this.state.data <= 1000) {
                this._timer && clearInterval(this._timer);
                this.props.timeOut();
            }this.setState({ data: this._index });
        }, 1000);
    }
    stopTime() {
        this._timer && clearInterval(this._timer);
    }
    componentWillUnmount() {
        this._timer && clearInterval(this._timer);
    }

// 内完成支付，
// 否则将无法完成订单
    render() {
        return (
            <Text style={this.props.timeText}>
                {Tools.timeMMSS(this.state.data)}
            </Text>
        );
    }

    componentDidMount() {
        this._index = this.props.Times;
        this.countTime(this.props.Times);
    }
} 