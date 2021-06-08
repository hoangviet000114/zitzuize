import * as React from 'react';
import { View, StyleSheet, TextInput} from 'react-native';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import AsyncStorage from '@react-native-async-storage/async-storage';
const GOOGLE_PLACES_API_KEY = 'AIzaSyB5p60oJRZIdMzBQRmHMuIeEWjQLIchVS0'; // never save your real api key in a snack!
import {host} from '../model/host';

const ChangeAddressScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
        <GooglePlacesAutocomplete
            placeholder="Search"
            query={{
            key: GOOGLE_PLACES_API_KEY,
            language: 'vn', // language of the results
            components: 'country:vn',
            }}
            onPress={(data, details = null) => {
                //console.log(data); 
                //AsyncStorage.setItem("ADDRESS",JSON.stringify(""));
                AsyncStorage.setItem("ADDRESS",JSON.stringify(data.description));
                navigation.goBack();
                //navigation.goBack();
            }}
            onFail={(error) => console.error(error)}
            requestUrl={{
            url:
                'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
            useOnPlatform: 'web',
            }} // this in only required for use on the web. See https://git.io/JflFv more for details.
        />
    </View>
  );
};


export default ChangeAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: '#ecf0f1',
  },
});

