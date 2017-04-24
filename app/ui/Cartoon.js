import React, { Component } from 'react';

import {
  View,
  BackAndroid,
  Platform,
  Navigator,
  ListView,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  StyleSheet
} from 'react-native';
var Theme = require('../utils/Theme');
var Tools = require('../utils/Tools');
import Storage from '../utils/Storage';
var id ;
import TitleView from '../commodules/Maintitle';
var checkIndex = -1;
export default class Cartoon extends React.Component {

  constructor(props) {
     super(props);
     this.state = {
        packageData:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
     };
    //
   }

   /***
   首页附近洗衣机点列表
   **/
   async getFloorCard(id){

     var url = Tools.URL.BASE_URL+'product/package?productId='+id;

     let response = await fetch(url);
     let responseJson = await response.json();
     if (responseJson.code===1000) {
      console.warn(JSON.stringify(responseJson));
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
       this.setState({
         packageData:ds.cloneWithRows(responseJson.data),
       });
     }
   }


   getStatus(data){

     if (data.onOffStatus===0) {
       return '离线';
     }
     if (data.washStatus === 2) {
           return("空闲");
       } else if ( data.washStatus === 1 || data.washStatus === 3) {
           return (data.washStatus === 1 ? "使用中" : "已预约");
       } else {
           return "未知";
     }
   }


     getStatusColor(data){

       if (data.onOffStatus===0) {
         return '#EE1F09';
       }
       if (data.washStatus === 2) {
         return '#08c847';
         } else if ( data.washStatus === 1 || data.washStatus === 3) {
              return '#EE1F09';;
         } else {
         return '#EE1F09';
       }
     }

     getUseed(is,tag){
       if(is){
         return null;
       }

       return(<Text style={{backgroundColor:'#5A97F3',color:'#ffffff',fontSize: 15 , marginLeft:10 ,padding:1,paddingRight:5,paddingLeft:5,borderRadius:3}}>{tag}</Text>);
     }


     render(){
       var topView;
       if (this.props.dto) {

         var color = this.getStatusColor(this.props.dto);
         var Used = this.getUseed(this.props.dto.collection===0,'常用');
         var colleced = this.getUseed(this.props.dto.isUse===0,'收藏');
         topView = (

           <View style={{ flexDirection:'row',backgroundColor:'#fFffff',marginLeft:25,marginTop:-25, marginRight:25 }}>
             <View style={{backgroundColor:color,width:3,}}/>
             <View style={{flex:1,backgroundColor:'#ffffff',marginLeft:15,paddingTop:8,paddingBottom:8}}>
               <Text style={{color:'#000000',fontSize: 15}}>{this.props.dto.showName}</Text>
               <View style={{ alignItems:'flex-end',flexDirection:'row',marginTop:2}}>
                 <Text style={{backgroundColor:color,color:'#ffffff',fontSize: 15,padding:1,borderRadius:3,paddingRight:5,paddingLeft:5}}>{this.getStatus(this.props.dto)}</Text>
                 {Used}
                 {colleced}
                 <View style={{flex:1, alignItems:'flex-end',marginRight:10}} >
                     <Text>{this.props.dto.distance}</Text>
                 </View>
               </View>
             </View>
           </View>

         );
       }
       return (
         <View style={styles.container}>
           <TitleView
             ClickLeft={()=>{this.onBackAndroid()}}
             leftIcon={<Image tintColor={'#ffffff'} source={require('../image/nav_finish.png')}/>}
             title={'洗衣机'} titleColor={'#ffffff'}/>

           <View style={{backgroundColor:Theme.Theme.color,height:35}}>
             </View>
             {topView}

             <ListView
               margin={25}

        dataSource={this.state.packageData}
        renderRow={(data) => this.getPackageView(data)}
      />


      <View style={{flex:1,alignItems:'center', justifyContent: 'center', justifyContent: 'center' }} activeOpacity={0.8} onPress={()=>this.onClick('2')}>
        <Text>最后消毒时间：{Tools.timeFormt(this.props.dto.lastCleanTime)}</Text>
      </View>
    <View style={{alignItems:'flex-end',flexDirection:'row',flex:1,justifyContent:'flex-end'}}>
         <TouchableOpacity style={{backgroundColor:'#2275fe',alignItems:'center', justifyContent: 'center',height:50, width:Tools.ScreenSize.width/2}} activeOpacity={0.8} onPress={()=>this.onClick('1')}>
              <Text style={{color:'white'}}>预约使用</Text>
         </TouchableOpacity>
         <TouchableOpacity style={{backgroundColor:'#08c847',alignItems:'center', justifyContent: 'center',height:50, width:Tools.ScreenSize.width/2}} activeOpacity={0.8} onPress={()=>this.onClick('2')}>
              <Text  style={{color:'white'}} >立即使用</Text>
         </TouchableOpacity>
      </View>
         </View>)
     }

     getPackageView(data){
       if (checkIndex===-1) {
         checkIndex = data.id;
       }
       var check = require('../image/nocheck_de.png');
       if (data.id === checkIndex) {
          check = require('../image/check_ed.png');
       }
       return (
         <TouchableOpacity activeOpacity={0.8} onPress={()=>this.onselect(data.id)}>
         <View style={{ alignItems:'center',flexDirection: 'row',padding:16,backgroundColor:'#ffffff', marginTop:0.6 }}>
              <Image source={{uri: data.icon}} style={{width: 30, height: 30,marginRight:10,marginLeft:10 }} />
              <View style={{flexDirection: 'column'}}>
                <Text style={{color:'#000000'}}>{data.name}</Text>
                <Text>{data.desp}</Text>
              </View>
              <View style={{flexDirection: 'row',justifyContent:'flex-end',flex:1}}>
                 <Text>{data.spend/100}元</Text>
                 <Image source={check} style={{width: 30, height: 30,marginRight:10,marginLeft:10 }} />
              </View>
          </View>
        </TouchableOpacity>
        );
     }

     onselect(id){
       if(checkIndex === id){
         return;
       }
       checkIndex =id;
       this.setState({
       });
     }

     onClick(id){
       Tools.toastShort(id,false);
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
      if (this.props.dto.onOffStatus == 0 || this.props.dto.washStatus != 2){
        Alert.alert(
             '',
             '洗衣机当前为'+this.getStatus(this.props.dto)+'状态，请选择其他空闲设备！',
             [
               {text: 'OK', onPress: () => this.onBackAndroid()},
             ]
           );
      }

      this.getFloorCard(this.props.id);
    }
}


const styles = StyleSheet.create({
  container: {
  flex: 1,
  flexDirection: 'column',
  backgroundColor: '#f0ffff',
},
})
