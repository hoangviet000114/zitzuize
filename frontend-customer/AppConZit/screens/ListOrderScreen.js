import React,{useState} from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
//import {data} from '../model/data';
import CardListOrder from '../components/CardListOrder';
import OrderAgainScreen from './OrderAgainScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {host} from '../model/host';

const ListOrderScreen = ({route, navigation}) => {
  //const idType = route.params.idType;
  const listOrder = route.params.order;
  const listOrderFull = route.params.full;
  //const [listOrderReal, changeOrder] = useState([]);
  
  //const [listStore, changeListStore] = useState([]);
/* 
  if (foodStore != ""){
    let y = await fetch("http://my-app-food.herokuapp.com/api/findname", {
        method: 'POST',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'name' : foodStore,
        })
    })
    .then((response)=>response.json())
    .then((responseJson)=>{
      
      changeListStore(responseJson);
    });
  }
  else{
    fetch("http://my-app-food.herokuapp.com/api/list_res?id=" + idType, {
          // method: 'POST',
          // body: JSON.stringify({
          //     id: idType
          // })
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
          changeListStore(responseJson);
        });
  }

   */
  //console.log(listStore);
  
  //console.log(idType);
  const OrderAgain = (id) => {
        console.log(id);
        let arrListFood = [];
        let sum = 0;
        for (i = 0; i < listOrderFull.length; i++)
        if (listOrderFull[i].id_donhang === id){
            arrListFood.push({
                idFood: listOrderFull[i].id_monan, 
                foodImage: listOrderFull[i].anhmonan,
                foodName: listOrderFull[i].ten_monan,
                foodCost: listOrderFull[i].gia_tien,
                quantity: listOrderFull[i].soluong,
            });
            sum = sum + listOrderFull[i].gia_tien * listOrderFull[i].soluong;
        }
        AsyncStorage.removeItem("VOUCHER");
        AsyncStorage.setItem("CART", JSON.stringify(arrListFood));
        navigation.navigate('CartScreen', {idStore: listOrderFull[0].id_cuahang});//{itemData: arrListFood, TongGia: sum});
    }

  const renderItem = ({item}) => {
      let iddonhang = item.id_donhang;
      //let idcuahang = item.id_cuahang;
      return (
          <CardListOrder
              itemData={item}
              onPress={() => OrderAgain(iddonhang)}//navigation.navigate('CardItemDetails', {itemData: item})}
          />
      );
  };

  if (listOrder.length <= 0){
    return(
        <View style={{paddingTop: 200}}>
            <View style={{marginLeft: 20, marginRight: 20}}>
                <Text style={{alignSelf:'center', fontSize: 30}}>Bạn chưa đặt đơn hàng nào</Text>
                <Text style={{alignSelf:'center', fontSize: 20}}></Text>
            </View>

            <TouchableOpacity style = {styles.BackButton}
            onPress = {() => navigation.goBack()}>
                <Text style={{alignSelf:'center', fontSize: 25, color: '#f8f8ff'}}>Quay lại</Text>
            </TouchableOpacity>
        </View>
    )
  }
  else
  return (
    <View style={styles.container}>
      <FlatList 
          data={listOrder}
          renderItem={renderItem}
          keyExtractor={item => item.id_donhang}
      />
    </View>
  );
};

export default ListOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '90%',
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
});
