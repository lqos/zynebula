import React, { Component } from 'react';

import {
  View,
  BackAndroid,
  Platform,
  Navigator,
  TouchableHighlight,
  Text,
  Image,
  StyleSheet
} from 'react-native';
var Theme = require('../utils/Theme');
var Tools = require('../utils/Tools');
var id ;

export default class Cartoon extends React.Component {

  constructor(props) {
     super(props);
     this.state = {
        title:'wow',
     };
   }

     render(){
       return (
         <View style={styles.container}>

           <Image style={{height:Tools.ScreenSize.width*250/375,width:Tools.ScreenSize.width,backgroundColor:'red'}}  source={require('../image/bg.png')}>
             <TouchableHighlight onPress={this.onBackAndroid}>
               <Image style={{tintColor:Theme.Theme.color,margin:12}} source={require('../image/nav_finish.png')} />
             </TouchableHighlight>

             <TouchableHighlight style={{alignItems: 'flex-end',flex:1,justifyContent: 'flex-end',margin:10}} onPress={this.onBackAndroid}>

               <View style={{flexDirection:'row',height:32,width:120,backgroundColor:Theme.Theme.color,alignItems:'center',justifyContent: 'center',borderRadius:5}}>
                 <Image style={{height:28,width:28,backgroundColor:'red'}}  source={require('../image/read_icon.png')}/>
                 <Text style={{marginLeft:5,fontSize:16,color:'white'}}>开始阅读</Text>
               </View>

             </TouchableHighlight>


           </Image>


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

    componentDidMount() {
        id = this.props.id;
        this.getDatas(id);
    }

    getDatas(id){
      var url = 'http://wodm.9mobi.cn/api/v1/resource/topshow?location=1';
      fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({
                swipData: responseJson.data
              })
            })
            .catch((error) => {
              Storage.get(url).then(dataV=>{
                this.setState({
                  swipData:dataV
                })
              });
              console.error(error);
            });



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
