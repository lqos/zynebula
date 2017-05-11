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
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Text style={{ color: 'white', fontSize: 18,marginLeft:10 }}>News</Text>

      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: Theme.Theme.color },
  })
  constructor(props) {
    super(props);

  }

  render() {
    return (<Text>wode News</Text>);
  }

}
