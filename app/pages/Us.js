import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    DeviceEventEmitter,
    View
} from 'react-native';

var Tools = require('../utils/Tools');
var Theme = require('../utils/Theme');

import ScoreUi from '../ui/ScoreUI';
import SellectUI from '../ui/SellectUI';

import LogUi from '../ui/LogIn';

export default class Us extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,
    })

    constructor(props) {
        super(props);
        this.state = {
            header: 1,
        }
    }

    render() {
        let header = (<Image style={{ width: 80, height: 80, resizeMode: 'contain', borderRadius: 80 }}
            source={require('../image/icon_header.png')} />);
        let nickNane = '请登录';
        if (Tools.CURRINTUSER) {
            nickNane = Tools.CURRINTUSER.nickName;
            header = (<Image style={{ width: 80, height: 80, resizeMode: 'contain', borderRadius: 80 }}
                source={{ uri: Tools.CURRINTUSER.portrait }} />);
        }
        return (
            <ScrollView>
                <View style={styles.contain}>

                    <Image style={{ width: Tools.ScreenSize.width, height: 266 }}
                        source={require('../image/header_bg.png')}>

                        <View
                            style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.setTabindex(99)}>
                                {header}
                            </TouchableOpacity>
                            <Text style={{ fontSize: 16, marginTop: 10, color: '#333' }}>{nickNane}
                            </Text>
                        </View>

                    </Image>

                    <TouchableOpacity onPress={() => this.setTabindex(1)}>
                        <View style={styles.lineStyle}>
                            <Image source={require('../image/us_reader_icon.png')} />
                            <Text style={styles.line_text}>
                                我的消息
                            </Text>
                            <Image source={require('../image/icon_enter.png')} />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.line} />

                    <TouchableOpacity onPress={() => this.setTabindex(2)}>
                        <View style={styles.lineStyle}>
                            <Image source={require('../image/us_message_icon.png')} />
                            <Text style={styles.line_text}>
                                学校认证
                            </Text>
                            <Image source={require('../image/icon_enter.png')} />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.line} />


                    <TouchableOpacity onPress={() => this.setTabindex(3)}>
                        <View style={styles.lineStyle}>
                            <Image source={require('../image/us_cache_icon.png')} />
                            <Text style={styles.line_text}>
                                意见反馈
                            </Text>
                            <Image source={require('../image/icon_enter.png')} />
                        </View>
                    </TouchableOpacity>


                    <View style={styles.line} />

                    <TouchableOpacity onPress={() => this.setTabindex(4)}>
                        <View style={styles.lineStyle}>
                            <Image source={require('../image/us_jilu_icon.png')} />
                            <Text style={styles.line_text}>
                                常见问Ti
                            </Text>
                            <Image source={require('../image/icon_enter.png')} />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.line} />

                    <TouchableOpacity onPress={() => this.setTabindex(7)}>
                        <View style={styles.lineStyle}>
                            <Image source={require('../image/us_set.png')} />
                            <Text style={styles.line_text}>
                                设置
                            </Text>
                            <Image source={require('../image/icon_enter.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line} />

                </View>
            </ScrollView>
        );
    }

    setTabindex(index) {
        const { navigator } = this.props;
        if (index === 7) {
            this.props.navigation.navigate('SetUi', {})

        } else if (index === 2) {
            this.props.navigation.navigate('MessageUI', {})
        } else if (index === 99) {
            this.props.navigation.navigate('Login', {})
        }

    }

    updata(data) {
        this.setState({});
    }

    //注册这个监听事件
    componentDidMount() {
        DeviceEventEmitter.addListener('login', this.updata);
    }

    //在组件销毁的时候要将其移除
    componentWillUnmount() {
        DeviceEventEmitter.remove();
    }

}


const styles = StyleSheet.create({
    contain: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    line: {
        height: 0.8,
        marginLeft: 13,
        backgroundColor: '#ECECEC'
    },
    lineStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 13,
        backgroundColor: 'white',
    },
    line_text: {
        marginLeft: 10,
        fontSize: 16,
        flex: 1
    }, titleView: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
    },
});
