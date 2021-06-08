import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, AsyncStorage, TouchableOpacity, Image } from 'react-native';
import { host } from '../model/host';

const VoucherDetailScreen = ({ navigation, route }) => {
    const Title = route.params.id;
    const MoTa = route.params.mota;

    return (
        <View style={styles.container}>

            <View style={styles.TopImageCate}>
                <Image
                    source={require('../assets/banners/VoucherCover.jpg')}
                    resizeMode="cover"
                    style={styles.TopImage}
                />
            </View>
            <Text
                style={{
                    alignSelf: 'center',
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: '#333',
                }}>
                {Title}
            </Text>
            <Text
                style={{
                    alignSelf: 'center',
                    fontSize: 24,
                    //fontWeight: 'bold',
                    color: '#333',
                    marginLeft: 30,
                    marginRight: 30,
                }}>
                {Title}>
                {MoTa}
            </Text>
        </View>
    )

};

export default VoucherDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignSelf: 'center'
    },
    BackButton: {
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: '#fa8072',
        height: 40,
        width: '80%',
        justifyContent: 'space-around',
    },
    PayButton: {
        borderRadius: 10,
        alignSelf: 'center',
        //marginBottom: 20,
        //marginTop: 10,
        marginLeft: 20,
        backgroundColor: '#fa8072',
        height: 40,
        width: '60%',
        justifyContent: 'space-around',
    },
    TopImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',

    },
    TopImageCate: {
        width: '100%',
        height: 350,
    },
});
