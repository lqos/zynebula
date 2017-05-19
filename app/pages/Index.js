import React, {Component} from 'react';
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
import DevieUI from '../widget/DevieUI';
import Cartoon from '../ui/Cartoon';
import * as http from '../utils/RequestUtil';
import LogUi from '../ui/LogIn';
var page = 1;
export default class Index extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    })

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            swipData: null,
            schoolName: null,
            schoolobj: null,
            isRefreshing: true,
            LeftName: '为您推荐',
            RecommendData: null,
            FloorCardData: null

        }
    }

    componentWillMount() {
        this._onRefresh();
    }

    /***
     首页附近洗衣机点列表
     **/
    async getFloorCard(latitude, longitude, id) {
        let urt = '';
        if (id) {
            urt = '&parentId=' + id;
        }
        let header = {};
        if (Tools.USER) {
            header = {
                'token': Tools.USER.token,
                'userId': Tools.USER.userId
            };
            urt = urt + '&userId=' + Tools.USER.userId;
        }
        http.require('product/floorCard?longitude=' + longitude + '&latitude=' + latitude + '&page=' + 1 + '&size=' + (5 * page) + urt, 'GET', header, null)
            .then((responseJson) => {
                if (responseJson.code === 1000) {
                    this.setState({
                        isRefreshing: false,
                        FloorCardData: responseJson.data,
                    })
                }
            });
    }


    /**
     或取首页推荐设备 或者正在使用的设备
     */
    getRecommend(latitude, longitude, id) {
        let urt = '';
        let header = {};
        if (Tools.USER) {
            header = {
                'token': Tools.USER.token,
                'userId': Tools.USER.userId
            };
            urt = urt + '?userId=' + Tools.USER.userId;
        }
        let params = {'latitude': latitude, longitude: longitude, 'parentId': id};
        http.require('product/recommend' + urt, 'GET', header, params).then((responseJson) => {
            let name = '我的洗衣机';
            // if (responseJson.code === 1000) {
            //     name = '为您推荐';
            // } else if (responseJson.code === 2000) {
            //     name = '正在使用';
            // }
            // console.warn(JSON.stringify(responseJson));
            this.setState({
                isRefreshing: false,
                LeftName: name,
                RecommendData: responseJson.data,
            })
        });
    }

    /**
     获取首页推荐学校
     */
    async getSchoolName(latitude, longitude) {

        let header = {};
        if (Tools.USER) {
            header = {
                'token': Tools.USER.token,
                'userId': Tools.USER.userId
            };
        }
        var url = 'product/school?longitude=' + longitude + '&latitude=' + latitude;
        // console.warn(url);
        http.require(url, 'GET', header, null).then((responseJson) => {

            this.setState({
                schoolName: responseJson.data.showName,
                schoolobj: responseJson.data,
                isRefreshing: false,
            })
            this.getRecommend(latitude, longitude, responseJson.data.id);
            this.getFloorCard(latitude, longitude, responseJson.data.id);
        }).catch((err) => {
            this.getRecommend(latitude, longitude, '0');
            this.getFloorCard(latitude, longitude, '0');
        });

    }

    /**
     获取首页轮播图
     */
    async  getBanner() {
        http.require('task?type=1', 'GET', null)
            .then((responseJson) => {
                this.setState({
                    swipData: responseJson.data,
                    isRefreshing: false,
                })
            });
    }


    _onRefresh() {
        page = 1;
        this.getBanner();

        Storage.get('Geolocation').then(data => {
            if (data) {
                this.getSchoolName(data.latitude, data.longitude);
            } else
                this.getSchoolName(0, 0);

        });
    }
    LookDetail(data) {
        if (Tools.USER) {
            this.props.navigation.navigate('Cartoon', {data: data})
        } else {
            this.props.navigation.navigate('Login', {})
        }
        // TODO  如果未登录则跳转登录界面
        // TODO  如果是预约状态或者是使用状态则跳转订单详情页 （是自己使用或者预约）

    }

    render() {
        var Swiperview;
        if (this.state.swipData) {
            Swiperview = (
                <Swiper
                    index={0} autoplayTimeout={10} loop={true} backgroundColor={'gray'}
                    height={Tools.ScreenSize.width * 284 / 667} autoplay={true} autoplayDirection={true}
                    dot={<View style={{
                        backgroundColor: '#9BD86F',
                        width: 5,
                        height: 5,
                        borderRadius: 4,
                        marginLeft: 2,
                        marginRight: 2,
                        marginTop: 3,
                    }}/>}
                    activeDot={<View style={{
                        backgroundColor: '#42b100',
                        width: 5,
                        height: 5,
                        borderRadius: 4,
                        marginLeft: 2,
                        marginRight: 2,
                        marginTop: 3
                    }}/>}
                    paginationStyle={{
                        left: null, right: 10, bottom: 10,
                    }}>
                    {
                        this.state.swipData.map((data, i) => {
                            return (
                                <TouchableOpacity activeOpacity={0.8} key={i}>
                                    <Image style={{
                                        width: Tools.ScreenSize.width,
                                        height: Tools.ScreenSize.width * 284 / 667,
                                        resizeMode: 'stretch',
                                    }} source={{uri: data.image}}/>
                                </TouchableOpacity>)
                        })
                    }
                </Swiper>
            );
        }

        var recommend;
        if (this.state.RecommendData) {
            recommend = (
                this.state.RecommendData.map((data, i) => {
                    return (<DevieUI key ={i} data={data} onPress={()=>{this.LookDetail(data)}}/>)
                })
            );
        }
        var pointView;
        if (this.state.FloorCardData) {
            pointView = (
                this.state.FloorCardData.map((data, i) => {
                    return (
                        <TouchableOpacity activeOpacity={0.8} key={i} onPress={() => {
                            this.props.navigation.navigate('MoreResource', {data: data})
                        }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                backgroundColor: '#fFffff',
                                marginLeft: 10,
                                marginBottom: 5,
                                marginRight: 10
                            }}>
                                <View style={{backgroundColor: '#08c847', width: 3}}/>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: '#ffffff',
                                    marginLeft: 15,
                                    paddingTop: 8,
                                    paddingBottom: 8
                                }}>
                                    <Text style={styles.labeStyle}>{data.showName}</Text>
                                    <View style={{alignItems: 'flex-end', flexDirection: 'row', marginTop: 3}}>
                                        <Text style={{
                                            backgroundColor: '#08c847',
                                            color: '#ffffff',
                                            fontSize: 15,
                                            padding: 1,
                                            borderRadius: 3,
                                            paddingRight: 5,
                                            paddingLeft: 5
                                        }}>{data.freeNumber}台空闲</Text>

                                        <View style={{flex: 1, alignItems: 'flex-end', marginRight: 10}}>
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
                        onRefresh={() => {
                            this._onRefresh();
                        }}
                        tintColor="#ff0000"
                        title="Loading..."
                        titleColor="#00ff00"
                        colors={[Theme.Theme.color]}
                        progressBackgroundColor="#ffffff"
                    />
                }
            >
                {Swiperview}
                <View flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} flex={1}
                      paddingLeft={10} paddingRight={10} paddingTop={10}>
                    <Text style={styles.labeStyle}>{this.state.LeftName}</Text>
                    <Text style={styles.labeStyle}>{this.state.schoolName}</Text>
                </View>
                {recommend}
                <View flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} flex={1}
                      padding={10}>
                    <Text style={styles.labeStyle}>附近洗衣机</Text>
                </View>
                {pointView}
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    page += 1
                    Storage.get('Geolocation').then(data => {
                        this.getFloorCard(data.latitude, data.longitude, this.state.schoolobj.id);
                    });
                }}>
                    <View style={{flex: 1, alignItems: 'center', marginTop: 5, marginBottom: 5}}>
                        <Text style={styles.labeStyle}>显示更多</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    labeStyle: {
        color: '#333333',
        fontSize: 16,
    },
});
