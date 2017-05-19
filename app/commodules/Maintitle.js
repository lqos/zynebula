/*
 自定义title
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


export default class Maintitle extends Component {
  render() {
    return (
      <View style={styles.titleView} >
        <TouchableOpacity onPress={this.props.ClickLeft}>
          <View width={50}>
            <Image tintColor={this.props.tintColor}  source={this.props.leftIcon}/>
          </View>
        </TouchableOpacity>
        <Text style={{ color: this.props.titleColor, fontSize: 18 }}>{this.props.title}</Text>
        <TouchableOpacity onPress={this.props.ClickRight}>
          <View width={50} alignItems={'flex-end'}>
            <Image source={this.props.rightIcon}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  titleView: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Theme.Theme.color,
    alignItems: 'center',
    height: 50,
  }
});
