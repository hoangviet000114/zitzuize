import React,{useState} from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import CardFoodInCart from '../components/CardFoodInCart';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {host} from '../model/host';

const OrderAgainScreen = ({navigation, route}) => {
    //console.log();
    const [cartItems, changeCartItems] = useState(route.params.itemData);
    const [sumOfCost, setSumCost] = useState(route.params.TongGia);
    const [address, changeAddress] = useState("");
    //const address = route.params._address;
    console.log(cartItems);

    /* AsyncStorage.getItem("CART", (err, res) => {
        if (!res) changeCartItems([]);
        else {
            changeCartItems(JSON.parse(res));
            //console.log(cartItems);
        }

        let temp = 0;
        if (cartItems.length > 0) 
            for (let userObject of cartItems) {
                temp = temp + userObject.foodCost * userObject.quantity;
            }

        if (sumOfCost !== temp) setSumCost(temp);
    });  */
    AsyncStorage.getItem("ADDRESS", (err, res) => {
        let tempppp = address;
        if (res)// changeAddress("");
        {
            //changeAddress(JSON.parse(res));
            tempppp = JSON.parse(res);
        }
        if (address != tempppp && tempppp != "") 
            changeAddress(tempppp);
    });

    const removeItem = ({itemToRemove}) => {
        
        

        let items = [];
        cartItems.map((item) => {
          if(JSON.stringify(item) !== JSON.stringify(itemToRemove) )
            items.push(item);
        });
        
        changeCartItems({cartItems : items});
        //AsyncStorage.setItem("CART",JSON.stringify(items));
        
        //setSumCost(sumOfCost - itemToRemove.foodCost * itemToRemove.quantity);
        let temp = 0;
        if (cartItems.length > 0) 
            for (let userObject of cartItems) {
                temp = temp + userObject.foodCost * userObject.quantity;
            }

        if (sumOfCost !== temp) setSumCost(temp);
    };

    const renderItem = ({item}) => {
        return (
            <CardFoodInCart 
                itemData={item}
                onPress={()=>{console.log(item); removeItem({itemToRemove: item})}}
            />
        );
    };

    async function ThanhToan() {
        /* let temp = 0;
        let x = await fetch("https://my-app-food.herokuapp.com/api/orderid", {
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            temp = responseJson[0].id_donhang;
            console.log(responseJson);
            console.log(temp);
        });
        for(let i = 0; i < cartItems.length; i++){
            let y = await fetch("https://my-app-food.herokuapp.com/api/order", {
                method: 'POST',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'id': 10 
                },
                body: JSON.stringify({
                    'food_id' : cartItems[i].idFood,
                    'order_id' : temp + 1,
                    'num' : cartItems[i].quantity,
                })
            })
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log(responseJson);
            });
        } */

        //console.log(temp);
        AsyncStorage.setItem("CART", JSON.stringify([]));
        let ten = "";
        AsyncStorage.getItem("NAME", (err, res) => {
            ten = JSON.parse(res);
            navigation.navigate('ShippingScreen', {cart: cartItems, sum: sumOfCost, adr: address, yourname: ten});
        /* console.log("ASAS");
        console.log(ten); */
        });
        /* console.log("BCBC");
        console.log(ten);

        navigation.navigate('ShippingScreen', {cart: cartItems, sum: sumOfCost, adr: address, yourname: ten}); */
    };

        /* return (
            <View>

            </View>
        ) */
        return (        
            <View style={styles.container}>
                <View style={{flexDirection: 'row', height: 130, paddingTop: 10, backgroundColor: '#ffe6d7'}}>
                    <View style={{flexDirection: 'column', flex: 6}}>
                        <Text style={{fontSize: 20, marginLeft: 10}}>Giao hàng đến</Text>
                        <Text numberOfLines={2} style={{fontWeight: 'bold', fontSize: 25, marginLeft: 10, }}>{address}</Text>
                        <Text style={{fontSize: 15, marginLeft: 10}}>Phí giao hàng: 15.000đ</Text>
                    </View>
                    <TouchableOpacity style={{alignSelf: 'center', flex: 1}}
                    onPress = {() => navigation.navigate('ChangeAddressScreen')}>
                        <Icon
                            name="edit"
                            size={25}
                            color={'#5d5d5d'}
                            backgroundColor={'#f5f5f5'}  
                        />
                    </TouchableOpacity>
                </View>
                <FlatList 
                    style = {{paddingLeft: 10, paddingRight: 10}}
                    data={cartItems}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                <View style={{flexDirection: 'row', paddingBottom: 20, paddingTop: 10, backgroundColor: '#ffe6d7'}}>
                    <View style={{flexDirection: 'column', paddingLeft: 10}}>
                        <Text style={{fontSize: 17}}>Tổng cộng:</Text>
                        <Text style={{fontSize: 20, fontWeight:'bold'}}> {sumOfCost + 15000}đ</Text>
                    </View>
                    
                    <TouchableOpacity style = {styles.PayButton}
                    onPress = {() => ThanhToan()}>
                        <Text style={{alignSelf:'center', fontSize: 25, color: '#f8f8ff'}}>Đặt lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    
};

export default OrderAgainScreen;

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
  }
});
