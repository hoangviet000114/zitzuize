/* import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    Image
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import AddFoodCard from '../components/AddFoodCard';

const AddFoodScreen = ({navigation}) => {
    //const { colors } = useTheme();
    return (
        <View>
            <AddFoodCard/>
        </View>
    );
}

export default AddFoodScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  
});

 */

import React,{useState} from 'react';
import {View, Text, TouchableOpacity,ScrollView,Animated,Dimensions,StyleSheet,Image} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';/* 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons' */
import { DebugInstructions } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {host} from '../model/host';
//import {Header,Button} from '../../components'; 
const HEIGHT = Dimensions.get('screen').height
const DISH_IMAGE_HEIGHT = HEIGHT/2-50;
/* const AmountButton = (props)=>{
    const iStyle=StyleSheet.create({
        container:{
            height:40,
            width:'30%',
            flexDirection:'row',
            backgroundColor:'#ee4444',
            elevation:2,
            borderRadius:10,
            justifyContent:'space-around',
            alignSelf: 'center',
        },
        button:{
            height:35,
            aspectRatio:1/1,
            elevation:3,
            borderRadius:5,
            alignSelf:'center',
            alignItems:'center',
            justifyContent:'space-around'
        }
    })
    return(
       <View style={iStyle.container}>
           <TouchableOpacity style={iStyle.button}>
               <Text style={{color:'#fff', fontSize:18}}>-</Text>
           </TouchableOpacity>
           <Text style={{color:'#fff', fontSize:18,alignSelf:'center'}}>{props?.currentAmount||'1'}</Text>
           <TouchableOpacity style={iStyle.button}>
               <Text style={{color:'#fff', fontSize:18}}>+</Text>
           </TouchableOpacity>
       </View>
    )
} */
/* const MyCheckBox = (props) =>{
    const [check,setCheck] = useState(false);
    return(
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>setCheck(!check)} style={{marginRight:10}}>
                <MaterialIcons name={check?'check-circle':'radio-button-unchecked'} size={25} color={check?'orange':'#000'}/>
            </TouchableOpacity>
            <Text style={props?.title.toUpperCase()=='LARGE'?{marginRight:50}:null}>{props?.title}</Text>
        </View>
    )
} */
export default function AddFoodScreen({route, navigation}){

    const itemData = route.params.itemData;
    const [numOfFood, changeNumOfFood] = useState(0);

    const [scrollY, setScrollY] = useState(new Animated.Value(0))
    const heightImage = scrollY.interpolate({
        inputRange:[0,DISH_IMAGE_HEIGHT],
        outputRange:[DISH_IMAGE_HEIGHT,DISH_IMAGE_HEIGHT/2],
    }
    )
    const heightIcon = scrollY.interpolate({
        inputRange:[0,DISH_IMAGE_HEIGHT-25],
        outputRange:[DISH_IMAGE_HEIGHT-25,DISH_IMAGE_HEIGHT/2-25],
    })
    const heightContent = scrollY.interpolate({
        inputRange:[0,HEIGHT-DISH_IMAGE_HEIGHT],
        outputRange:[HEIGHT-DISH_IMAGE_HEIGHT,HEIGHT-DISH_IMAGE_HEIGHT/2+25],
    })

    const addToCart = () => {
        if (numOfFood > 0){
            product = {
                idFood: itemData.id_monan, 
                foodImage: itemData.anhURL,
                foodName: itemData.ten_monan,
                foodCost: itemData.gia_tien,
                quantity: numOfFood,
            }

            AsyncStorage.getItem("CART", (err, res) => {
                if (!res) AsyncStorage.setItem("CART", JSON.stringify([product]));
                else {
                    var items = JSON.parse(res);
                    let tmp = false;
                    for (i = 0; i < items.length; i++)
                        if (items[i].idFood === product.idFood){
                            items[i].quantity += product.quantity;
                            tmp = true;
                        }
                    if (tmp === false) items.push(product);
                    AsyncStorage.setItem("CART", JSON.stringify(items));
                }
                console.log(res);
                navigation.goBack();
            });
        }
    }

    return(
        <View style = {styles.container}>
            {/* <Header
                // left={<Entypo name='menu' size={22} 
                // onPress={()=>navigation.openDrawer()}/>}
                left={<Ionicons name='arrow-back' size={22} 
                onPress={()=>navigation.goBack()}/>}
                right={<View/>}
                title='Dish Description'
            /> */}
            
            {/* <Animated.View
                style={[styles.dishImage,{height:heightImage,zIndex:1}]}
            > */}
            <View>
                <Image source={{uri: itemData.anhURL}} style={styles.image} />
                {/* <Animated.View style={[styles.icons,{right:10,top:heightIcon}]}>
                    <Entypo name='shopping-cart' size={20}/>
                </Animated.View> */}
            </View>
            {/* </View></Animated.View> */}
            
            <Animated.View style={{height:heightContent,flex:1}}>
                <ScrollView
                    onScroll={Animated.event([
                        {nativeEvent:{
                            contentOffset:{
                                y:scrollY
                            }
                        }}
                    ],{useNativeDriver:false})}
                >
                    <View style={styles.amountDish}>
                        <Text style={styles.dishName}>{itemData.ten_monan.toUpperCase()}</Text>
                        <Text style={styles.foodDescription}>{itemData.mo_ta}</Text>
                        <Text style = {styles.price}>Giá: {itemData.gia_tien} đồng</Text>

                    </View>
                    {/* <View style={styles.vote}>
                        <View style={{flexDirection:'row'}}>
                            <Entypo name='star-outlined' size={22}/>
                            <Entypo name='star-outlined' size={22}/>
                            <Entypo name='star-outlined' size={22}/>
                            <Entypo name='star-outlined' size={22}/>
                            <Entypo name='star-outlined' size={22}/>
                        </View>
                        <Text>How do you feel? Is this delious? How much is vote for this dish? </Text>
                    </View> */}
                    {/* <View>
                        <AmountButton/> */}
                        {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <MyCheckBox title='Small'/>
                            <MyCheckBox title='Medium'/>
                            <MyCheckBox title='Large'/>

                        </View> */}
                    {/* </View> */}

                    <View style={iStyle.container}>
                        <TouchableOpacity style={iStyle.button}
                        onPress={()=>changeNumOfFood( numOfFood>0 ? numOfFood-1 : numOfFood-0)}>
                            <Text style={{color:'#fa8072', fontSize:30,}}>-</Text>
                        </TouchableOpacity>
                        <Text style={{color:'#000000', fontSize:18,alignSelf:'center'}}>{numOfFood}</Text>
                        <TouchableOpacity style={iStyle.button}
                        onPress={()=>changeNumOfFood(numOfFood + 1)}>
                            <Text style={{color:'#fa8072', fontSize:20}}>+</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.addFoodButton}
                onPress={() => addToCart()}>
                    <Text style={{color:'#f8f8ff', fontSize:20, alignSelf: 'center', alignItems:'center',}}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
            </Animated.View>
            {/* Icon part */}
            {/* <View style={[styles.icons,{left:10}]}>
                <Entypo name='star' size={20}/>
            </View>
            <View style={[styles.icons,{right:10}]}>
                <Entypo name='shopping-cart' size={20}/>
            </View> */}
            {/* <View style = {[styles.activeStyle,{
                bottom:10,
                left:10,
            }]}>
                <Entypo name = 'message' size={22} color = '#fff'/>
            </View> */}
            {/* <View style = {[styles.activeStyle,{
                bottom:10,
                right:10
            }]}>
                <Entypo name = 'shopping-cart' size = {22} color='#fff'/>
            </View> */}
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flex:1
    },
    dishImage:{
        backgroundColor:'#ffb8af',
        // height:DISH_IMAGE_HEIGHT
    },
    icons:{
        height:50,
        aspectRatio:1/1,
        backgroundColor:'#fff',
        position:'absolute',
        borderRadius:90,
        elevation:5,
        justifyContent:'center',
        alignItems:'center',
    },
    amountDish:{
        margin:10,
        height:230,
        //elevation:3,
        borderWidth: 4,
        borderColor: '#ffdab9',
        borderRadius:10,
        paddingLeft:10,
        justifyContent:'space-around'
    },
    dishName:{
        marginTop: 20,
        marginRight: 25,
        marginLeft: 25,
        color:'#000000',
        fontWeight: 'bold',
        fontSize: 25,
        flex: 1,
    },
    foodDescription:{
        marginLeft: 25,
        marginRight: 25,
        color:'#696969',
        flex: 1,
    },
    price:{
        marginLeft: 25,
        color:'#696969',
        flex: 1,
    },
    vote:{
        padding:20,
        borderRadius:10,
        elevation:3,
        marginHorizontal:10,
        marginBottom:10
    },
    addFoodButton:{
        borderRadius:10,
        alignSelf: 'center',
        marginBottom: 20,
        backgroundColor:'#fa8072',
        height: 40,
        width: '80%',
        justifyContent:'space-around',
    },
    image: {
        height: 300,
        width: Dimensions.get('window').width,
        alignSelf: 'stretch',
        resizeMode: 'cover',
    },
});
const iStyle=StyleSheet.create({
    container:{
        height:40,
        width:'50%',
        flexDirection:'row',
        //backgroundColor:'#ee4444',
        //elevation:2,
        //borderRadius:10,
        justifyContent:'space-around',
        alignSelf: 'center',
    },
    button:{
        height:35,
        aspectRatio:1/1,
        //elevation:3,
        borderColor: '#fa8072',
        borderRadius:50,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'space-around',
        borderWidth: 3,
        //flex: 0.3,
        //backgroundColor: "pink",
        //borderColor: "#663399",
        //borderWidth: 5,
    }
});