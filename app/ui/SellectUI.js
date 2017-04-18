import React, { Component } from 'react';

import {
  View,
  BackAndroid,
  Platform,
  Navigator,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
} from 'react-native';
var Theme = require('../utils/Theme');
var Tools = require('../utils/Tools');
var id ;

export default class SellectUI extends React.Component {

  constructor(props) {
     super(props);
     this.state = {
        title:'wow',
     };
   }

     render(){
       return (
         <View style={styles.container}>

            <View style={styles.titleView} >
              <TouchableOpacity onPress={this.onBackAndroid}>
               <Image style={{tintColor:Theme.Theme.color}} source={require('../image/nav_finish.png')} />
               </TouchableOpacity>
               <Text style={{color:'#333333',fontSize: 18,marginRight:5}}>我的收藏</Text>

            <Text style={{color:'#333333',fontSize: 18}}></Text>

             </View>


         </View>)
     }
     componentWillMount() {
        if (Platform.OS === 'android') {
          BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
      }

     componentWillUnmount() {
        if (Platform.OS === 'android') {
          BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
      }

     onBackAndroid = () => {
      const { navigator } = this.props;
      const routers = navigator.getCurrentRoutes();
      if (routers.length > 1) {
        navigator.pop();
        return true;
      }
      return false;
    }




}


const styles = StyleSheet.create({
  titleView:{
    paddingLeft:10,
    paddingRight:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'#0000',
    alignItems: 'center',
    height:50,
  },
  container: {
  flex: 1,
  flexDirection: 'column',
  backgroundColor: '#F5FCFF',
},
})
