import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity,} from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
} from 'react-native-paper';
//import {
//    DrawerContentScrollView,
//    DrawerItem
//} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import{ AuthContext } from '../components/context';
import {host} from '../model/host';

const DrawerContent = ({navigation}) => {

    const paperTheme = useTheme();

    const { signOut, toggleTheme } = React.useContext(AuthContext);
    const [realName, changeRealName] = useState("");
    const [description, changeDescription] = useState("");

    AsyncStorage.getItem("NAME", (err, res) => {
      if (res){
          //changeRealName(JSON.parse(res));
          changeRealName(res);
      }
      
      //console.log(isChangeImage);
    });
    AsyncStorage.getItem("PHONENUMBER", (err, res) => {
      if (res){
        //changeDescription(JSON.parse(res));
        changeDescription(res);
      }
      
      //console.log(isChangeImage);
    });
    
    const OpenListOrder = async() =>{
      
      console.log(1);
      let ID;
      let yy = await AsyncStorage.getItem("userToken", (err, res) => {
        if (res){
          ID = res;
        }
      });

      console.log(ID);
      
      let temp = [];
      let y = await fetch("http://" + host + ":8000/api/list_order", {
        method: 'POST',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'id' : ID,
        })
      })
      .then((response)=>response.json())
      .then((responseJson)=>{
        temp = responseJson;
        //changeListStore(responseJson);
      });

      //console.log(temp);

      if (temp.length === 0){
      navigation.navigate('ListOrderScreen', {order: temp});return;}
      else {
        let arTemp = [];
        let id = temp[0].id_donhang;
        let storeName = temp[0].ten_cuahang;
        let sumCost = temp[0].soluong * temp[0].gia_tien;
        let quantity = temp[0].soluong;
        let anhURL = temp[0].anhcuahang;
        for (i = 1; i < temp.length; i++)
        if (temp[i].id_donhang !== id){
          arTemp.push({
            id_donhang: id,
            tenCuaHang: storeName,
            tongGiaTri: sumCost,
            soLuong: quantity,
            img: anhURL
          });
          id = temp[i].id_donhang;;
          storeName = temp[i].ten_cuahang;
          sumCost = temp[i].soluong * temp[i].gia_tien;
          quantity = temp[i].soluong;
          anhURL = temp[i].anhcuahang;
        }
        else{
          sumCost = sumCost + temp[i].soluong * temp[i].gia_tien;
          quantity = quantity + temp[i].soluong;
        }

        arTemp.push({
          id_donhang: id,
          tenCuaHang: storeName,
          tongGiaTri: sumCost,
          soLuong: quantity,
          img: anhURL
        });
        console.log(arTemp);
        navigation.navigate('ListOrderScreen', {order: arTemp, full: temp});
      }
    }

    return(
        <View style={{flex:1}}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                      <Text style={styles.title}>{realName}</Text>
                      <Text style={styles.caption}>{description}</Text>                           
                    </View>
                    <View style={styles.listButton}>
                      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} style={styles.button}>
                          <Text style={styles.buttonText}>Sửa thông tin cá nhân</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => OpenListOrder()} style={styles.button}>
                          <Text style={styles.buttonText}>Lịch sử đặt hàng</Text>
                      </TouchableOpacity>
                      
                      
                      <TouchableOpacity onPress={() => signOut()} style={styles.button}>
                          <Text style={styles.buttonText}>Đăng xuất</Text>
                      </TouchableOpacity>
                    </View>
                </View>
        </View>
    );
}

/*<TouchableRipple onPress={() => {}}>
                        <View style={styles.preference}>
                            <Text>Dark Theme</Text>
                            <View pointerEvents="none">
                                <Switch value={paperTheme.dark}/>
                            </View>
                        </View>
                    </TouchableRipple>*/

const styles = StyleSheet.create({
    drawerContent: {
      flex: 10,
      backgroundColor: '#ffe6d7',
      //alignItems: 'center',
    },
    userInfoSection: {
      //marginLeft:15
      backgroundColor: '#fda656',
      paddingLeft: 20,
      paddingTop: 10,
      marginBottom: 15,
      flex: 3,
      //alignSelf: 'center',
    },
    title: {
      fontSize: 40,
      //marginTop: 3,
      fontWeight: 'bold',
      color: '#fffaf0',
    },
    caption: {
      fontSize: 24,
      color: '#f8f8ff',
      //lineHeight: 14,
    },
    listButton: {
      flex: 5,
      paddingBottom: 350,
    },
    button: {
      backgroundColor: '#fffaf0',
      marginBottom: 2,
      marginTop: 2,
      flex: 1,
      paddingLeft: 25,
      flexDirection: 'row',
    },
    buttonText: {
      fontSize: 17,
      textAlignVertical: 'center',
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

  export default DrawerContent;