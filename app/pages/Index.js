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
import * as http from '../utils/RequestUtil';
var page=1;
export default class Index extends React.Component {

 constructor(props) {
    super(props);
      this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      swipData:null,
      schoolName: null,
      schoolobj: null,
      isRefreshing: true,
      LeftName: '为您推荐',
      RecommendData:null,
      FloorCardData:null

  }}

  componentWillMount() {
    this._onRefresh();
   }

  //  product/floorCard
  /***
  首页附近洗衣机点列表
  **/
  async getFloorCard(latitude,longitude,id){
    var urt='';
    if (id) {
      urt='&parentId='+id;
    }
    var url = Tools.URL.BASE_URL+'product/floorCard?longitude='+longitude+'&latitude='+latitude+'&page='+1+'&size='+(5*page)+'&userId='+Tools.URL.USER.id+urt;
    let response = await fetch(url);
    let responseJson = await response.json();
    if (responseJson.code===1000) {
      this.setState({
        isRefreshing:false,
        FloorCardData: responseJson.data,
      })
    }
  }


    /**
    或取首页推荐设备 或者正在使用的设备
    */
     getRecommend(latitude,longitude,id){
      let params = {'latitude':latitude,longitude:longitude,'userId': Tools.URL.USER.id, 'parentId': id};
      http.get('product/recommend',params).then((responseJson)=>{
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
      }); 
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
         schoolobj:responseJson.data,
         isRefreshing:false,
       })
       this.getRecommend(latitude,longitude,responseJson.data.id);
       this.getFloorCard(latitude,longitude,responseJson.data.id);
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
    page=1;
    this.getBanner();

    Storage.get('Geolocation').then(data=>{
        this.getSchoolName(data.latitude,data.longitude);
    });
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

LookDetail(data){
  // TODO  如果未登录则跳转登录界面
  // TODO  如果是预约状态或者是使用状态则跳转订单详情页 （是自己使用或者预约）
  const { navigator } = this.props;
        navigator.push({
          name: 'Cartoon',
          component:Cartoon,
          params: {
            dto:data,
            id:data.id
          }
        });
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
         var Used = this.getUseed(data.collection===0,'常用');
         var colleced = this.getUseed(data.isUse===0,'收藏');
          return (
            <TouchableOpacity activeOpacity={0.8} key={i} onPress={()=>this.LookDetail(data)}>
              <View style={{flex:1,flexDirection:'row',backgroundColor:'#fFffff',marginLeft:10,marginTop:8, marginRight:10}}>
                <View style={{backgroundColor:color,width:3}}/>
                <View style={{flex:1,backgroundColor:'#ffffff',marginLeft:15,paddingTop:8,paddingBottom:8}}>
                  <Text style={styles.labeStyle}>{data.showName}</Text>
                  <View style={{ alignItems:'flex-end',flexDirection:'row',marginTop:2}}>
                    <Text style={{backgroundColor:color,color:'#ffffff',fontSize: 15,padding:1,borderRadius:3,paddingRight:5,paddingLeft:5}}>{this.getStatus(data)}</Text>
                    {Used}
                    {colleced}
                    <View style={{flex:1, alignItems:'flex-end',marginRight:10}} >
                        <Text>{data.distance}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>)
          })
    );
    }
    var pointView;
    if(this.state.FloorCardData){
      pointView=(
        this.state.FloorCardData.map((data,i)=>{
           var color = this.getStatusColor(data);
           return (
             <TouchableOpacity activeOpacity={0.8} key={i} onPress={()=>{
               const { navigator } = this.props;
                     navigator.push({
                       name: 'MoreResource',
                       component:MoreResource,
                       params: {
                         dto:data
                       }
                     });
               }}>
               <View style={{flex:1,flexDirection:'row',backgroundColor:'#fFffff',marginLeft:10,marginBottom:5, marginRight:10}}>
                 <View style={{backgroundColor:'#08c847',width:3}}/>
                 <View style={{flex:1,backgroundColor:'#ffffff',marginLeft:15,paddingTop:8,paddingBottom:8}}>
                   <Text style={styles.labeStyle}>{data.showName}</Text>
                   <View style={{ alignItems:'flex-end',flexDirection:'row',marginTop:3}}>
                     <Text style={{backgroundColor:'#08c847',color:'#ffffff',fontSize: 15,padding:1,borderRadius:3,paddingRight:5,paddingLeft:5}}>{data.freeNumber}台空闲</Text>

                     <View style={{flex:1, alignItems:'flex-end',marginRight:10}} >
                         <Text>{data.distance}</Text>
                     </View>
                   </View>
                 </View>
               </View>
             </TouchableOpacity>)
            })
      );
    }
    return (
      <ScrollView
        backgroundColor={'#f0ffff'}
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
      <View flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} flex={1} paddingLeft={10}paddingRight={10}paddingTop={10}>
        <Text style={styles.labeStyle}>{this.state.LeftName}</Text>
        <Text style={styles.labeStyle}>{this.state.schoolName}</Text>
      </View>
       {recommend}
       <View flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} flex={1} padding={10}>
         <Text style={styles.labeStyle}>附近洗衣机</Text>
       </View>
       {pointView}
       <TouchableOpacity activeOpacity={0.8} onPress={()=>{
         page+=1
         Storage.get('Geolocation').then(data=>{
             this.getFloorCard(data.latitude,data.longitude,this.state.schoolobj.id);
         });
         }}>
         <View style={{flex:1, alignItems:'center',marginTop:5,marginBottom:5}}>
             <Text style={styles.labeStyle}>显示更多</Text>
         </View>
       </TouchableOpacity>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({

     labeStyle:{
         color:'#333333',
         fontSize: 16,
     },
});
