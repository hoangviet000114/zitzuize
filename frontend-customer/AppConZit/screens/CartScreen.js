import React,{useState, useEffect} from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import CardFoodInCart from '../components/CardFoodInCart';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from "firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {host} from '../model/host';
import Geocode from "react-geocode";
//import distance from 'path/to/google-distance/dist/index.mjs';
import {getDistance, getPreciseDistance} from 'geolib';

const GOOGLE_PLACES_API_KEY = 'AIzaSyB5p60oJRZIdMzBQRmHMuIeEWjQLIchVS0';

const CartScreen = ({navigation, route}) => {
    //console.log();
    const [cartItems, changeCartItems] = useState([]);
    const [sumOfCost, setSumCost] = useState(0);
    const [address, changeAddress] = useState("");
    const [sale, changeSale] = useState(0);
    const [idKhachHang, changeIdKhach] = useState(0);
    const [SDTKhachHang, changeSDTKhach] = useState("");
    const [start, changeStart] = useState({latitude: 0, longitude: 0});
    const [end, changeEnd] = useState({latitude: 0, longitude: 0});
    const [shippingFee, changeShippingFree] = useState(15000);
    const [shipDistance, changeShipDistance] = useState(1);

    const idStore = route.params.idStore;
    
    //console.log(idStore);

    AsyncStorage.getItem("CART", (err, res) => {
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
    }); 
    AsyncStorage.getItem("ADDRESS", (err, res) => {
        let tempppp = address;
        if (res !== null)// changeAddress("");
        {
            //changeAddress(JSON.parse(res));
            tempppp = res;//JSON.parse(res);
        }
        if (address != tempppp && tempppp != ""){
            changeAddress(tempppp);

            Geocode.fromAddress(tempppp).then(
                response => {
                    const { lat, lng } = response.results[0].geometry.location;
                    changeEnd({
                        latitude: lat,
                        longitude: lng,
                    });
                    //console.log(start);
                    /* console.log(lat);
                    console.log(lng); */
                    //console.log(getDistance(start, end, 1));
                },
                error => {
                  console.error(error);
                }
              );
        }
    });
    AsyncStorage.getItem("VOUCHER", (err, res) => {
        let tempppp;
        if (res !== null)// changeAddress("");
        {
            tempppp = JSON.parse(res);
            if (tempppp.min <= sumOfCost){
                let tmp = sumOfCost * tempppp.phantram / 100;
                if (tmp > tempppp.max) tmp = tempppp.max;
                if (sale !== tmp) changeSale(tmp);
            }
        }
    });

    useEffect(() => {
        if (start.latitude !== 0 && end.latitude !== 0 && start.longitude !== 0 && end.longitude !== 0){
            //console.log(start);
            //console.log(end);
            //console.log(getDistance(start, end, 1000) / 1000);
            let tmpp = getDistance(start, end, 1000) * 5000 / 1000;
            changeShipDistance(tmpp / 5000);
            if (tmpp < 15000) tmpp = 15000; 
            changeShippingFree(tmpp);
        }
    }, [start, end]);

    useEffect(() => {
        Geocode.setApiKey("AIzaSyA-b0JUVERWj4s6rSvKKrbNYS_uOCScweE");

        fetch("http://" + host + ":8000/api/getResdetail?id=" + idStore, {
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            //console.log(responseJson[0].dia_chi);
            Geocode.fromAddress(responseJson[0].dia_chi).then(
                response => {
                    const { lat, lng } = response.results[0].geometry.location;
                    changeStart({
                        latitude: lat,
                        longitude: lng,
                    });
                    //console.log(start);
                },
                error => {
                  console.error(error);
                }
            );
        });

        AsyncStorage.getItem("userToken", (err, res) => {
            let tempppp;
            if (res !== null)// changeAddress("");
            {
                tempppp = JSON.parse(res);
                changeIdKhach(tempppp);
                //console.log(tempppp);
            }
        });
        AsyncStorage.getItem("PHONENUMBER", (err, res) => {
            let tempppp;
            if (res !== null)// changeAddress("");
            {
                tempppp = res;//JSON.parse(res);
                changeSDTKhach(tempppp);
            }
        });


    }, []);

    const removeItem = ({itemToRemove}) => {
        
        

        let items = [];
        cartItems.map((item) => {
          if(JSON.stringify(item) !== JSON.stringify(itemToRemove) )
            items.push(item);
        });
        
        changeCartItems({cartItems : items});
        AsyncStorage.setItem("CART",JSON.stringify(items));
        
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
        console.log(cartItems);
        let temp = 0;

        /* let y = await fetch("http://192.168.1.139:8000/api/xxx", {
                method: 'POST',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'id': 10 
                },
                body: JSON.stringify({
                    cartItems,
                })
            })
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log(responseJson);
            }); 
 
        console.log("AAAAAAA");
        console.log(JSON.stringify({
            cartItems,
        })); */
        
        console.log("AAAAAAA");

        //console.log(temp);
        AsyncStorage.removeItem("CART");
        //AsyncStorage.setItem("CART", JSON.stringify([]));

        let cuahang2;
        //console.log(firstItem);
        let y = await fetch("http://" + host + ":8000/api/getResdetail?id=" + idStore, {
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            cuahang2 = responseJson;
            //changeListStore(responseJson);
        });
        //console.log(cuahang2);

        AsyncStorage.getItem("NAME", (err, res) => {
            let ten = res;//JSON.parse(res);

            var postListRef = firebase.database().ref('orders');
            var newPostRef = postListRef.push();
            newPostRef.set(
            JSON.stringify({
                cart: cartItems,
                sum: sumOfCost,
                address: address,
                sale: sale,
                idStore: idStore,
                name: ten,
                id_khachhang: idKhachHang,
                sdt_khachhang: SDTKhachHang,
                Store: cuahang2,
                shippingFee: shippingFee,
                shipDistance: shipDistance,
            })
            );

            navigation.navigate('ShippingScreen', {cart: cartItems, sum: sumOfCost, adr: address, yourname: ten, sale: sale, sdt: SDTKhachHang, shippingFee: shippingFee});
        
        });

        //console.log(cartItems);
    };

    const ShowListVoucher = async() => {
        
        //console.log("AAAAAAAAAA");
        let temp = [];
        let y = await fetch("http://" + host + ":8000/api/list_voucher_rest?id=" + idStore, {
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            temp = responseJson;
        });
        //console.log("QW");
        
        navigation.navigate('ChooseVoucherScreen', {list: temp});
    }

    if (cartItems.length <= 0){
        return(
            <View style={{paddingTop: 200}}>
                <View style={{marginLeft: 20, marginRight: 20}}>
                    <Text style={{alignSelf:'center', fontSize: 30}}>Giỏ hàng bạn trống</Text>
                    <Text style={{alignSelf:'center', fontSize: 20}}>Hãy đặt món gì đó và ăn thôi</Text>
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
                <View style={{flexDirection: 'row', height: 130, paddingTop: 10, backgroundColor: '#ffe6d7'}}>
                    <View style={{flexDirection: 'column', flex: 6}}>
                        <Text style={{fontSize: 20, marginLeft: 10}}>Giao hàng đến</Text>
                        <Text numberOfLines={2} style={{fontWeight: 'bold', fontSize: 25, marginLeft: 10, }}>{address}</Text>
                        <Text style={{fontSize: 15, marginLeft: 10}}>Phí giao hàng: {shippingFee}đ  ({shipDistance}km) </Text>
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
                <View style={{paddingBottom: 20, paddingTop: 10, backgroundColor: '#ffe6d7'}}>
                    <TouchableOpacity style={styles.VoucherButton}
                        onPress={() => ShowListVoucher()}>
                        <Text style={{color:'#f8f8ff', fontSize:20, alignSelf: 'center', alignItems:'center',}}>Danh sách khuyến mãi</Text>
                    </TouchableOpacity>
                    <View style = {{marginLeft: 10}}>
                        <Text style={{fontSize: 17}}>Được giảm:</Text>
                        <Text style={{fontSize: 20, fontWeight:'bold'}}> {sale}đ</Text>
                    </View>
                    <View style = {{flexDirection: 'row', }}>
                        <View style={{flexDirection: 'column', paddingLeft: 10}}>
                            <Text style={{fontSize: 17}}>Tổng cộng:</Text>
                            <Text style={{fontSize: 20, fontWeight:'bold'}}> {sumOfCost - sale + shippingFee}đ</Text>
                        </View>
                        
                        <TouchableOpacity style = {styles.PayButton}
                        onPress = {() => ThanhToan()}>
                            <Text style={{alignSelf:'center', fontSize: 25, color: '#f8f8ff'}}>Thanh toán</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
};

export default CartScreen;

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
  VoucherButton:{
    marginBottom: 10,
    borderRadius:10,
    alignSelf: 'center',
    backgroundColor:'#fa8072',
    height: 30,
    width: '80%',
    justifyContent:'space-around',
    
},
});
