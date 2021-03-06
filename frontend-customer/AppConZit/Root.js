import React, {useEffect} from 'react';
//import {YellowBox} from 'react-native';
import { View, ActivityIndicator, TextInput, StyleSheet, TouchableOpacity , Text, Image} from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from './components/context';
import AsyncStorage from '@react-native-community/async-storage';

import CardListScreen from './screens/CardListScreen';
import CardItemDetails from './screens/CardItemDetails';
import DrawerContent from './screens/DrawerContent';
import RootStackScreen from './screens/RootStackScreen';
import AddFoodScreen from './screens/AddFoodScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import ChangeAddressScreen from './screens/ChangeAddressScreen';
import ProfileScreen from './screens/ProfileScreen';
import ListOrderScreen from './screens/ListOrderScreen';
import OrderAgainScreen from './screens/OrderAgainScreen';
import ListVoucherScreen from './screens/ListVoucherScreen';
import VoucherDetailScreen from './screens/VoucherDetailScreen';
import ChooseVoucherScreen from './screens/ChooseVoucherScreen';
import * as firebase from "firebase";

import HomeScreen from './screens/HomeScreen';

import LottieView from 'lottie-react-native';

import Icon from 'react-native-vector-icons/Ionicons';

//YellowBox.ignoreWarnings(['Setting a timer']);

const Stack = createStackNavigator();

const Router = () => {

  const initialLoginState = {
    isLoading: true,
    //userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          //userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          //userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          //userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = foundUser.ID;
      //const userName = foundUser[0].username;
      
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }

      try {
        await AsyncStorage.setItem('NAME', foundUser.Name);
      } catch(e) {
        console.log(e);
      }

      try {
        await AsyncStorage.setItem('PHONENUMBER', foundUser.PhoneNumber);
      } catch(e) {
        console.log(e);
      }

      try {
        await AsyncStorage.setItem('EMAIL', foundUser.Email);
      } catch(e) {
        console.log(e);
      }

      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', /* id: userName, */ token: userToken });
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }

      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
          // An error happened.
      });
      
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 3000);
  }, []);


  //<LottieView source={require('./assets/10818-food-around-the-city.json')}/> th??m v??o d?????i
  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Image style={{width: '100%', height: '100%'}}
          source={require('./assets/banners/Waiting.png')}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        { loginState.userToken !== null ? (
          <Stack.Navigator headerMode = "none" initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="DrawerContent" component={DrawerContent} />
            <Stack.Screen name="CardListScreen" component={CardListScreen} />
            <Stack.Screen name="CardItemDetails" component={CardItemDetails} />
            <Stack.Screen name="AddFoodScreen" component={AddFoodScreen} />
            <Stack.Screen name="CartScreen" component={CartScreen} />
            <Stack.Screen name="ShippingScreen" component={ShippingScreen} />
            <Stack.Screen name="ChangeAddressScreen" component={ChangeAddressScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="ListOrderScreen" component={ListOrderScreen} />
            <Stack.Screen name="OrderAgainScreen" component={OrderAgainScreen} />
            <Stack.Screen name="ListVoucherScreen" component={ListVoucherScreen} />
            <Stack.Screen name="VoucherDetailScreen" component={VoucherDetailScreen} />
            
            <Stack.Screen name="ChooseVoucherScreen" component={ChooseVoucherScreen} />
            
            
            
          </Stack.Navigator>
        )
        :
        <RootStackScreen/>
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default Router;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  topWrapper: {
    flexDirection: 'row',
    //backgroundColor: '#fff080',
  },
  textInputWrapper: {
    flex: 4,
  },
  textInput: {
    height: 35,
    borderColor: '#5d5d5d',
    borderWidth: 1,
  },
});