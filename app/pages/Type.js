import React, { Component } from 'react';
import {
  Text,
  Image
} from 'react-native';


export default class Type extends React.Component {
  constructor(props) {
    super(props);
  }


  render(){
    return (<Image style={{width:100,height:100}} source={require('../image/bg.png')}/>);
  }

}
