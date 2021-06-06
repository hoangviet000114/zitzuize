import React,{useState} from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {data} from '../model/data';
import Card from '../components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {host} from '../model/host';

const CardListScreen = ({route, navigation}) => {
  //const idType = route.params.idType;
  const listStore = route.params.store;
  
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

  const renderItem = ({item}) => {

    let xyz = item;
      return (
          <Card 
              itemData={item}
              onPress={async({item})=> {
                let zz = await AsyncStorage.removeItem("CART");//AsyncStorage.setItem("CART", JSON.stringify([]));
                let listFood;
                let listCate;
                //console.log(xyz);
                let xx = await fetch("http://" + host + ":8000/api/listfood?id=" + xyz.id_cuahang, {
                })
                .then((response)=>response.json())
                .then((responseJson)=>{
                  listFood = responseJson;//changeListFood(responseJson);
                });

                let yy = await fetch("http://" + host + ":8000/api/getcategory?id=" + xyz.id_cuahang, {
                })
                .then((response)=>response.json())
                .then((responseJson)=>{
                  listCate = responseJson;//changeListCate(responseJson);
                });

                navigation.navigate('CardItemDetails', {itemDataaa: xyz, listFood: listFood, listCate : listCate});
              }}
          />
      );
  };

  if (listStore.length <= 0){
    return(
        <View style={{paddingTop: 200}}>
            <View style={{marginLeft: 20, marginRight: 20}}>
                <Text style={{alignSelf:'center', fontSize: 30}}>Chẳng có quán ăn nào khớp với tìm kiếm của bạn cả</Text>
                <Text style={{alignSelf:'center', fontSize: 20}}>Hãy tìm lại đi</Text>
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
          data={listStore}
          renderItem={renderItem}
          keyExtractor={item => item.id}
      />
    </View>
  );
};

export default CardListScreen;

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
