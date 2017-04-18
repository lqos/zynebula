import React, { Component } from 'react';
import {TouchableHighlight,ListView,Image,Text,Platform,BackAndroid,View,StyleSheet ,ActivityIndicator,TouchableOpacity} from 'react-native';

var Tools = require('../utils/Tools');
var Theme = require('../utils/Theme');
import {PullList} from 'react-native-pull';
import Cartoon from '../ui/Cartoon';
var id ;

export default class MoreResource extends React.Component {

  constructor(props) {
    super(props);
    this.dataSource = [{
         id: 0, 
     }];
    this.state = {
       list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})),
       title:'',
       nomore:1,
    };
 this.renderRow = this.renderRow.bind(this);
 this.renderFooter = this.renderFooter.bind(this);

  this.getDatas = this.getDatas.bind(this);
  }
  onPullRelease(resolve) {
  //do something
  setTimeout(() => {
          resolve();
      }, 3000);
  }
  topIndicatorRender(pulling, pullok, pullrelease) {
          const hide = {position: 'absolute', left: -10000};
          const show = {position: 'relative', left: 0};
          if (pulling) {
              this.txtPulling && this.txtPulling.setNativeProps({style: show});
              this.txtPullok && this.txtPullok.setNativeProps({style: hide});
              this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
          } else if (pullok) {
              this.txtPulling && this.txtPulling.setNativeProps({style: hide});
              this.txtPullok && this.txtPullok.setNativeProps({style: show});
              this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
          } else if (pullrelease) {
              this.txtPulling && this.txtPulling.setNativeProps({style: hide});
              this.txtPullok && this.txtPullok.setNativeProps({style: hide});
              this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
          }
  		return (
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
                  <ActivityIndicator size="small" color={Theme.Theme.color} />

      		</View>
          );
  	}

    renderHeader() {
      return (
          null
      );
    }

    renderRow(item, sectionID, rowID, highlightRow) {
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={()=>this.binnerImagePress(item.type,item.id)}>
          <View style={styles.itemViewStyle} flexDirection={'column'} alignItems={'center'}>
             <Image  style={{width:Tools.ScreenSize.width /3.5,height:Tools.ScreenSize.width /3.5,borderRadius:2,resizeMode: 'stretch'}} source={{uri:item.showImage}}/>
             <Text style={{textAlign:'center',fontSize:13,color:'#333333',marginTop:3}}>{item.name}</Text>
             <Text numberOfLines={1} style={{ textAlign:'center',width: Tools.ScreenSize.width /3.5,fontSize:10,color:'#666666',marginTop:3}}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    renderFooter() {
      if(this.state.nomore) {
          return null;
      }
      return (
          <View style={{height: 100}}>
              <ActivityIndicator color={Theme.Theme.color}/>
          </View>
      );
    }

    binnerImagePress(type,resourceId){
      Tools.toastShort('type='+type+', resourceId = '+resourceId ,false);
      const { navigator } = this.props;
      if (navigator) {
        if (type===2) {
          navigator.push({
                   name: 'Cartoon',
                   component: Cartoon,
                   params: {
                      id:resourceId,
                  }
               });
        }
      }

    }
    // loadMore() {
    //       this.dataSource.push({
    //           id: 0,
    //           title: 'begin to create data ...',
    //       });
    //       for(var i = 0; i < 1; i++) {
    //           this.dataSource.push({
    //               id: i + 1,
    //               title: 'this is ${i}',
    //           })
    //       }
    //       this.dataSource.push({
    //           id: 6,
    //           title:'finish create data ...',
    //       });
    //       setTimeout(() => {
    //           this.setState({
    //               list: this.state.list.cloneWithRows(this.dataSource)
    //           });
    //       }, 1000);
    //   }


  render(){
    return(
      <View style={styles.container}>
        <View style={styles.titleView}>
          <TouchableHighlight onPress={this.onBackAndroid}>
            <Image style={{tintColor:Theme.Theme.color}} source={require('../image/nav_finish.png')} />
          </TouchableHighlight>
          <Text style={{color:'#333333',fontSize: 18,marginRight:5}}>{this.state.title}</Text>
          <Text style={{color:'#333333',fontSize: 18}}></Text>
        </View>
        <PullList
                  style={{}}
                  onPullRelease={this.onPullRelease} topIndicatorRender={this.topIndicatorRender} topIndicatorHeight={60}
                  renderHeader={this.renderHeader}
                  dataSource={this.state.list}
                  pageSize={5}
                  initialListSize={5}
                  renderRow={this.renderRow}
                  onEndReached={this.getDatas}
                  onEndReachedThreshold={60}
                  renderFooter={this.renderFooter}
                  />
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
      this.setState({
          title: this.props.title,
      });
      this.getDatas;
  }


  getDatas(){
    fetch('http://wodm.9mobi.cn/api/v1/column/findResourceByColumnId?columnId='+id)
          .then((response) => response.json())
          .then((responseJson) => {
            setTimeout(() => {
                this.setState({
                    list: this.state.list.cloneWithRows(responseJson.data)
                });
            }, 1000)

          })
          .catch((error) => {
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
    backgroundColor:'#ffffff',
    alignItems: 'center',
    height:50,
  },
  container: {
  flex: 1,
  flexDirection: 'column',
  backgroundColor: '#F5FCFF',
},
listStyle:{
       flexDirection:'row', //改变ListView的主轴方向
       flexWrap:'wrap', //换行
   },
   itemViewStyle:{
       alignItems:'center', //这里要注意，如果每个Item都在外层套了一个 Touchable的时候，一定要设置Touchable的宽高
       width: Tools.ScreenSize.width /3,
   },
})
