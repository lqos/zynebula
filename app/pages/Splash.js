import React, { Component } from 'react';
import {
  Text,
  navigator,
  StatusBar,
  Image
} from 'react-native';

import Home from '../home/Home';
import Tools from '../utils/Tools';

export default class Splash extends React.Component {

  componentDidMount() {
  this.timer = setTimeout(() => {
    const { navigator } = this.props;
     navigator.push({
              name: 'Main',
              component: Home
          });
  }, 1000);
}

componentWillUnmount() {
  clearTimeout(this.timer);
}

  render(){
    return (

      <Image source={require('../image/bg.png')}/>);
  }

}
