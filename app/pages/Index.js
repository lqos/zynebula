import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ListView,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import {
  MapView,
  MapTypes,
  Geolocation
} from 'react-native-baidu-map';


var Tools = require('../utils/Tools');
var Theme = require('../utils/Theme');
import Swiper from 'react-native-swiper';
import Storage from '../utils/Storage';
import MoreResource from './MoreResource';
import Cartoon from '../ui/Cartoon';

export default class Index extends React.Component {

 constructor(props) {
    super(props);
      this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      swipData:null,
      schoolName: null,
      isRefreshing: true,
      LeftName: '为您推荐',
      RecommendData:null

  }}
  componentWillMount() {
    this._onRefresh();
   }

  /**
  获取当前经纬度 百度定位
  */
   getCurrentPosition(){
     Geolocation.getCurrentPosition()
                 .then(data => {
                   console.warn(JSON.stringify(data));
                   this.getSchoolName(data.latitude,data.longitude);
                 })
                 .catch(e =>{
                   console.warn(e, 'error');
                  this.getSchoolName(0,0);
                 })
   }


    /**
    或取首页推荐设备 或者正在使用的设备
    */
    async getRecommend(latitude,longitude,id){
      var urt='';
      if (id) {
        urt='&parentId='+id;
      }
      var url = Tools.URL.BASE_URL+'product/recommend?longitude='+longitude+'&latitude='+latitude+'&userId='+Tools.URL.USER.id+urt;

      let response = await fetch(url);
      let responseJson = await response.json();
      console.warn(responseJson.code);
      let name = '为您推荐' ;
      if (responseJson.code===1000) {
        name='为您推荐';
      }else if (responseJson.code===2000) {
        name='正在使用';
      }
      this.setState({
        isRefreshing:false,
        LeftName: name,
        RecommendData: responseJson.data,
      })
    }

     /**
     获取首页推荐学校
     */
    async getSchoolName(latitude,longitude){

       var url = Tools.URL.BASE_URL+'product/school?longitude='+longitude+'&latitude='+latitude;
       let response = await fetch(url);
       let responseJson = await response.json();
       this.setState({
         schoolName: responseJson.data.showName,
         isRefreshing:false,
       })
       this.getRecommend(latitude,longitude,responseJson.data.id);
     }





  /**
  获取首页轮播图
  */
async  getBanner(){
    var url = Tools.URL.BASE_URL+'task?type=1';
    try {
         // 注意这里的await语句，其所在的函数必须有async关键字声明
         let response = await fetch(url);
         let responseJson = await response.json();
         this.setState({
           swipData:responseJson.data,
           isRefreshing:false,
         })
       } catch(error) {
         console.error(error);
       }
  }


  _onRefresh(){
    this.getBanner();
    this.getCurrentPosition();
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



  render(){
    var Swiperview;
    if (this.state.swipData) {
    Swiperview =(
      <Swiper
       index={0} autoplayTimeout={10} loop={true} backgroundColor={'gray'} height={Tools.ScreenSize.width*284 / 667} autoplay={true} autoplayDirection={true}
        dot={<View style={{backgroundColor: '#9BD86F', width: 5, height: 5, borderRadius: 4, marginLeft: 2, marginRight: 2, marginTop: 3,  }} />}
             activeDot={<View style={{backgroundColor: '#42b100', width: 5, height: 5, borderRadius: 4, marginLeft: 2, marginRight: 2, marginTop: 3}} />}
             paginationStyle={{
              left: null, right: 10, bottom:10,
            }}>
            {
              this.state.swipData.map((data,i)=>{
                return (
                  <TouchableOpacity activeOpacity={0.8}  key={i} >
                    <Image style={{width:Tools.ScreenSize.width,height:Tools.ScreenSize.width*284 / 667,resizeMode: 'stretch',}} source={{uri:data.image}}/>
                  </TouchableOpacity>)
                })
            }
      </Swiper>
    );}

    var recommend;
    if (this.state.RecommendData) {
    recommend=(
      this.state.RecommendData.map((data,i)=>{
         var color = this.getStatusColor(data);
          return (
            <TouchableOpacity activeOpacity={0.8} key={i}>
              <View style={{flexDirection:'row',backgroundColor:'#ffffff',marginLeft:10,marginTop:10}}>
                <View style={{backgroundColor:color,width:3,height:50}}/>
                <View style={{backgroundColor:'#ffffff',marginLeft:15}}>
                  <Text style={{color:'#000000',fontSize: 15}}>{data.showName}</Text>
                  <View style={{flexDirection:'row',marginTop:2}}>
                    <Text style={{backgroundColor:color,color:'#ffffff',fontSize: 15,padding:1,borderRadius:3,paddingRight:5,paddingLeft:5}}>{this.getStatus(data)}</Text>
                    <Text style={{backgroundColor:'#5A97F3',color:'#ffffff',fontSize: 15 , marginLeft:10 ,padding:1,paddingRight:5,paddingLeft:5,borderRadius:3}}>{this.getStatus(data)}</Text>
                    <Text style={{backgroundColor:'#FF8400',color:'#ffffff',fontSize: 15 , marginLeft:10 ,padding:1,paddingRight:5,paddingLeft:5,borderRadius:3}}>{this.getStatus(data)}</Text>
                    <Text flex={1}>100m</Text>

                </View>
                </View>

              </View>

            </TouchableOpacity>)
          })
    );
    }




    return (
      <ScrollView
        refreshControl={
        <RefreshControl
          refreshing={this.state.isRefreshing}
          onRefresh={()=>{this._onRefresh();}}
          tintColor="#ff0000"
          title="Loading..."
          titleColor="#00ff00"
          colors={[Theme.Theme.color]}
          progressBackgroundColor="#ffffff"
        />
      }
      >
      {Swiperview}
      <View flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} flex={1} padding={10}>
        <Text style={{color:'#000000',fontSize: 16}}>{this.state.LeftName}</Text>
        <Text style={{color:'#000000',fontSize: 16}}>{this.state.schoolName}</Text>
      </View>
       {recommend}
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  listStyle:{
         flexDirection:'row', //改变ListView的主轴方向
         flexWrap:'wrap', //换行
     },
     itemViewStyle:{
         alignItems:'center', //这里要注意，如果每个Item都在外层套了一个 Touchable的时候，一定要设置Touchable的宽高
         width: Tools.ScreenSize.width /3,
     },
});
