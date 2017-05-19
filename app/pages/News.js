import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';

import Storage from '../utils/Storage';
var Tools = require('../utils/Tools');
var Theme = require('../utils/Theme');
import { Navigator } from 'react-native-deprecated-custom-components'
export default class News extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    })
  constructor(props) {
    super(props);

  }

  render() {
    return (<Text>wode News</Text>);
  }

}
