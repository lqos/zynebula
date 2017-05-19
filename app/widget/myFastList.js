
import React, { Component } from 'react'
import { View, Text, StyleSheet, RefreshControl, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import RefreshState from './RefreshState'

var page = 1;
 
class myFastList extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <FlatList
                {...this.props}
                keyExtractor={(item, index) => index}
                onRefresh={() => this.onRefresh()}
                onEndReached={() => this.onEndReached()}
                refreshing={this.props.refreshing}
            />
        );

    }

    onRefresh() {
        page = 1;
        this.props.loadMore(page, true);
    }

    onEndReached() {
        page += 1;
        this.props.loadMore(page, false);
    }

}
 
const styles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    footerText: {
        fontSize: 14,
        color: '#555555'
    }
});
 
export default myFastList;
