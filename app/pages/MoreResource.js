import React from 'react';
import {
    Text, BackHandler, View, StyleSheet, TouchableOpacity, ScrollView,
    FlatList
} from 'react-native';

var Tools = require('../utils/Tools');
var Theme = require('../utils/Theme');
import Storage from '../utils/Storage';
import DevieUI from '../widget/DevieUI';
import RefreshListView from '../widget/RefreshListView';
import TitleView from '../commodules/Maintitle';
import * as http from '../utils/RequestUtil';
var page = 1;

export default class MoreResource extends React.Component {
    state: {
        data: Object,
    }

    static navigationOptions = ({ navigation }) => ({
        header: null,
        cardStack: {
            gesturesEnabled: true  // 是否可以右滑返回
        }
    })


    constructor(props) {
        super(props);

        this.state = {
            refreshing: true,
            FloorCardData: null
        };
    }

    async getListData(latitude, longitude) {
        let info = this.props.navigation.state.params.data;
        var urt = '';
        if (info) {
            urt = '&parentId=' + info.id;
        }

        let header = {};
        if (Tools.USER) {
            header = {
                'token': Tools.USER.token,
                'userId': Tools.USER.userId
            };
            urt = urt + '&userId=' + Tools.USER.userId;
        }

        var url = 'product/listByFloorCard?longitude=' + longitude + '&latitude=' + latitude + '&page=' + 1 + '&size=' + (20 * page) + urt;

        http.require(url, 'GET', header, null).then((responseJson) => {
            console.warn(JSON.stringify(responseJson))
            if (responseJson.code === 1000) {
                this.setState({
                    FloorCardData: responseJson.data,
                    refreshing: false
                })
            }
        });
    }

    render() {
        let info = this.props.navigation.state.params.data;
        return (
            <View style={styles.container}>
                <TitleView
                    tintColor={'#ffffff'}
                    leftIcon={require('../image/nav_finish.png')} ClickLeft={() => this.onBackAndroid()} />

                <View style={{ backgroundColor: Theme.Theme.color, height: 50 }}>
                    <Text style={{ color: '#ffffff', marginLeft: 10 }}>{info.showName}</Text>
                    <View style={{ flexDirection: 'row', backgroundColor: Theme.Theme.color, marginTop: 3 }}>
                        <Text style={{ color: '#b9cae0', marginLeft: 10 }}>洗衣机{info.number}台</Text>
                        <Text style={{ color: '#b9cae0', marginLeft: 10 }}>空闲{info.freeNumber}台</Text>
                        <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}>
                            <Text style={{ color: '#b9cae0' }}>{info.distance}</Text>
                        </View>
                    </View>
                </View>
                <FlatList
                    data={this.state.FloorCardData}
                    refreshing={this.state.refreshing}
                    keyExtractor={(item, index) => index}
                    ListFooterComponent={() => { return <View flex={1} alignItems={'center'} justifyContent={'center'}><Text style={{ fontSize: 20 }}>load more ...</Text></View> }}
                    renderItem={({ item, i }) => <DevieUI key={i} data={item} onPress={() => { this.LookDetail(item) }} />}
                />
            </View>)

    }

    onRefresh(page, b) {
        Tools.toastShort('onRefresh' + page, b);
    }

    onEndReached() {
        Tools.toastShort('onEndReached', false);
    }

    LookDetail(data) {
        if (Tools.USER) {
            this.props.navigation.navigate('Cartoon', { data: data })
        } else {
            this.props.navigation.navigate('Login', {})
        }
        // TODO  如果未登录则跳转登录界面
        // TODO  如果是预约状态或者是使用状态则跳转订单详情页 （是自己使用或者预约）

    }

    componentDidMount() {
        Storage.get('Geolocation').then(data => {
            if (data)
                this.getListData(data.latitude, data.longitude);
            else this.getListData(0, 0);
        });
    }


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);

    }

    onBackAndroid = () => {
        const { goBack } = this.props.navigation;
        goBack();
        return true;
    }

}

const styles = StyleSheet.create({
    titleView: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        height: 50,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },
    listStyle: {
        flexDirection: 'row', //改变ListView的主轴方向
        flexWrap: 'wrap', //换行
    },
    itemViewStyle: {
        alignItems: 'center', //这里要注意，如果每个Item都在外层套了一个 Touchable的时候，一定要设置Touchable的宽高
        width: Tools.ScreenSize.width / 3,
    },
})
