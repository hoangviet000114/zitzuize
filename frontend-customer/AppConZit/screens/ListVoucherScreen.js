import React,{useState} from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Image} from 'react-native';
import CardVoucher from '../components/CardVoucher';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {host} from '../model/host';

const ListVoucherScreen = ({navigation, route}) => {
    const listVoucher = route.params.list;

    const renderItem = ({item}) => {
        return (
            <CardVoucher 
                itemData={item}
                onPress={async()=>{
                    let temp;
                    let y = await fetch("http://" + host + ":8000/api/list_res_voucher?id=" + item.id, {
                        
                    })
                    .then((response)=>response.json())
                    .then((responseJson)=>{
                        temp = responseJson;
                        //changeListStore(responseJson);
                    });
                    navigation.navigate('CardListScreen', {store: temp});
                }}
                onPress2={()=>
                    
                    navigation.navigate('VoucherDetailScreen', {id: item.id, mota: item.mota})
                }
                
            />
        );
    };

    if (listVoucher.length <= 0){
        return(
            <View style={{paddingTop: 200}}>
                <View style={{marginLeft: 20, marginRight: 20}}>
                    <Text style={{alignSelf:'center', fontSize: 30}}>Bạn không có khuyến mãi nào cả</Text>
                </View>

                <TouchableOpacity style = {styles.BackButton}
                onPress = {() => navigation.goBack()}>
                    <Text style={{alignSelf:'center', fontSize: 25, color: '#f8f8ff'}}>Quay lại</Text>
                </TouchableOpacity>
            </View>
        )
    }
    else{ 
        return (        
            <View style={styles.container}>
                
                <View style = {styles.TopImageCate}>
                    <Image
                    source={require('../assets/banners/VoucherBanner.jpg')}
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
                    Voucher của bạn
                </Text>
                <FlatList 
                    style = {{paddingLeft: 10, paddingRight: 10}}
                    data={listVoucher}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                
            </View>
        )
    }
};

export default ListVoucherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
    alignSelf: 'center'
  },
  BackButton: {
    borderRadius:10,
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor:'#fa8072',
        height: 40,
        width: '80%',
        justifyContent:'space-around',
  },
  PayButton: {
    borderRadius:10,
        alignSelf: 'center',
        //marginBottom: 20,
        //marginTop: 10,
        marginLeft: 20,
        backgroundColor:'#fa8072',
        height: 40,
        width: '60%',
        justifyContent:'space-around',
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
