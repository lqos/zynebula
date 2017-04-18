import  {
  AppRegistry,
  Text,
    ListView,
      Image,
        View,
          StyleSheet,
      TouchableOpacity,
} from 'react-native';
var Theme = require('../utils/Theme');
var Tools = require('../utils/Tools');
 var i = 0;

import React, { Component } from 'react';
class ViewPage extends Component {
 constructor(props) {
 super(props);

 }

 shouldComponentUpdate(nextProps, nextState) {
    return nextProps.dataSource !== this.props.dataSource;
 }

 render() {
        i=1+i;
 return (
   <ListView
    dataSource={this.props.dataSource}
    renderRow={(rowData) =>
      <View>
        <View flexDirection={'row'} justifyContent={'space-between'}  alignItems={'center'} padding={10}>
        <Text style={{fontSize:16,color:'#333333'}}>{rowData.name}</Text>

          <Text style={{fontSize:12,color:Theme.Theme.color}}>更多</Text>

        </View>
        {this.getLists(rowData.resources)}
      </View>
    }
    />

 )
  }


  getLists(datv){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    ds = ds.cloneWithRows(datv);

  return(<ListView
     dataSource={ds}
     contentContainerStyle={styles.listStyle}
     showsVerticalScrollIndicator={false}
     showsHorizontalScrollIndicator={false}
     renderRow={(rowData) =>

         <View style={styles.itemViewStyle} flexDirection={'column'} alignItems={'center'}>
            <Image  style={{width:Tools.ScreenSize.width /3.5,height:Tools.ScreenSize.width /3.5,borderRadius:2}} source={{uri:rowData.showImage}}/>
            <Text style={{textAlign:'center',fontSize:13,color:'#333333',marginTop:3}}>{rowData.name}</Text>
            <Text numberOfLines={1} style={{ textAlign:'center',width: Tools.ScreenSize.width /3.5,fontSize:10,color:'#666666',marginTop:3}}>{rowData.title}</Text>
         </View>

     }/>);

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

module.exports = ViewPage;
