import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  navigator,
  TouchableOpacity,
  Image,
  ScrollView,
  View
} from 'react-native';

var Tools = require('../utils/Tools');
var Theme = require('../utils/Theme');
var ImagePicker = require('react-native-image-picker');
import SetUi from '../ui/SetUi' ;
import ScoreUi from '../ui/ScoreUI' ;
import SellectUI from '../ui/SellectUI' ;
import MessageUI from '../ui/MessageUI' ;

export default class Us extends React.Component {

 constructor(props) {
    super(props);
    this.state={
      header:require('../image/left_icon.png'),
    }
  }

  render(){
    return (

      <ScrollView>
      <View style={styles.contain}>

        <Image style={{width:Tools.ScreenSize.width, height:266}} source={require('../image/header_bg.png')}>
          <View style={styles.titleView} >
                <Image style={{tintColor:Theme.Theme.color}} source={this.state.header} />
                <Text style={{color:'#333333',fontSize: 18}}>我的</Text>
                <TouchableOpacity onPress={this._onPressButton}>
                  <Image style={{marginRight:15,tintColor:Theme.Theme.color}}source={require('../image/nav_seach_icon.png')} />
                </TouchableOpacity>
          </View>
          <View style={{ flex:1,flexDirection:'column',alignItems:'center',justifyContent: 'center'}} >
              <TouchableOpacity onPress={this.selectImg}>
                <Image style={{width:80, height:80,resizeMode:'contain'}} source={require('../image/icon_header.png')}  />
              </TouchableOpacity>
              <Text style={{fontSize:16,color:'#333'}}>请登录
              </Text>
              <Text style={{fontSize:16,color:'#333'}}>
              </Text>
          </View>

        </Image>

        <TouchableOpacity onPress={()=>this.setTabindex(1)}>
          <View style={styles.lineStyle}>
            <Image source={require('../image/us_reader_icon.png')}/>
            <Text style={styles.line_text}>
              订购记录
            </Text>
            <Image source={require('../image/icon_enter.png')}/>
          </View>
        </TouchableOpacity>

        <View style={styles.line}/>

          <TouchableOpacity onPress={()=>this.setTabindex(2)}>
            <View style={styles.lineStyle}>
              <Image source={require('../image/us_message_icon.png')}/>
              <Text style={styles.line_text}>
                消息
              </Text>
              <Image source={require('../image/icon_enter.png')}/>
            </View>
          </TouchableOpacity>

        <View style={styles.line}/>


        <TouchableOpacity onPress={()=>this.setTabindex(3)}>
          <View style={styles.lineStyle}>
            <Image source={require('../image/us_cache_icon.png')}/>
            <Text style={styles.line_text}>
              离线缓存
            </Text>
            <Image source={require('../image/icon_enter.png')}/>
          </View>
        </TouchableOpacity>


        <View style={styles.line}/>

        <TouchableOpacity onPress={()=>this.setTabindex(4)}>
          <View style={styles.lineStyle}>
            <Image source={require('../image/us_jilu_icon.png')}/>
            <Text style={styles.line_text}>
                       观看记录
            </Text>
            <Image source={require('../image/icon_enter.png')}/>
          </View>
        </TouchableOpacity>


        <View style={styles.line}/>


        <TouchableOpacity onPress={()=>this.setTabindex(5)}>
          <View style={styles.lineStyle}>
            <Image source={require('../image/us_shou_icon.png')}/>
            <Text style={styles.line_text}>
              收藏
            </Text>
            <Image source={require('../image/icon_enter.png')}/>
          </View>
        </TouchableOpacity>


        <View style={styles.line}/>


        <TouchableOpacity onPress={()=>this.setTabindex(6)}>
          <View style={styles.lineStyle}>
            <Image source={require('../image/us_jifen_icon.png')}/>
            <Text style={styles.line_text}>
              我的积分
            </Text>
            <Image source={require('../image/icon_enter.png')}/>
          </View>
        </TouchableOpacity>


        <View style={styles.line}/>

        <TouchableOpacity onPress={()=>this.setTabindex(7)}>
          <View style={styles.lineStyle}>
            <Image source={require('../image/us_set.png')}/>
            <Text style={styles.line_text}>
              设置
            </Text>
            <Image source={require('../image/icon_enter.png')}/>
          </View>
        </TouchableOpacity>
        <View style={styles.line}/>

      </View>
</ScrollView>
    );
  }

  setTabindex(index){
      const { navigator } = this.props;
      if (index===7) {
          navigator.push({
                title: 'SetUi',
                component:SetUi,
          });

      }else if (index===6) {
          navigator.push({
                title: 'ScoreUi',
                component:ScoreUi,
          });

      }else if (index===5) {
          navigator.push({
                title: 'SellectUI',
                component:SellectUI,
          });

      }else  if (index===2){
        navigator.push({
              title: 'MessageUI',
              component: MessageUI,
        });

    }

  }

  selectImg(){
    var options = {
  title: '选择头像',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照', // 调取摄像头的按钮，可以设置为空使用户不可选择拍照
  chooseFromLibraryButtonTitle: '相册', // 调取相册的按钮，可以设置为空使用户不可选择相册照片
  customButtons: [
  ],
  mediaType: 'photo', // 'photo' or 'video'
};
/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info below in README)
 */
ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    let source = { uri: response.uri };

    // You can also display the image using data:
    // let source = { uri: 'data:image/jpeg;base64,' + response.data };

    this.setState({
      header: source
    });
  }
});
  }

}


const styles = StyleSheet.create({
  contain:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'white',
  },
  line:{
    height:0.8,
    marginLeft:13,
    backgroundColor:'#ECECEC'
  },
  lineStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    padding:13,
    backgroundColor:'white',
  },
  line_text:{
    marginLeft:10,
    fontSize:16,
    flex:1
  } ,titleView:{
      paddingLeft:10,
      paddingRight:10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height:50,
    },
});
