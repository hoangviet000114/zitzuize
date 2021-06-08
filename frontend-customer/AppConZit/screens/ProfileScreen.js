import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

//import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePicker from 'expo-image-picker';
import {host} from '../model/host';

const EditProfileScreen = ({navigation}) => {

    const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
    const {colors} = useTheme();
    const [name, changeName] = useState("");
    const [address, changeAddress] = useState("");
    const [realName, changeRealName] = useState("");
    const [description, changeDescription] = useState("");
    const [phone, changePhone] = useState("");
    const [email, changeEmail] = useState("");

    /* AsyncStorage.getItem("IMAGEPROFILE", (err, res) => {
        if (res){
            setImage(JSON.parse(res));
        }
        
        //console.log(isChangeImage);
    });
    AsyncStorage.getItem("NAME", (err, res) => {
        if (res){
            //changeRealName(JSON.parse(res));
          changeRealName(res);
        }
        
        //console.log(isChangeImage);
    });

    AsyncStorage.getItem("ADDRESS", (err, res) => {
        if (res){
            //changeAddress(JSON.parse(res));
            changeAddress(res);
        }
        
        //console.log(isChangeImage);
    }); */

  useEffect(() => {
    AsyncStorage.getItem("IMAGEPROFILE", (err, res) => {
      if (res){
          setImage(JSON.parse(res));
      }
      
      //console.log(isChangeImage);
    });
    AsyncStorage.getItem("NAME", (err, res) => {
        if (res){
            //changeRealName(JSON.parse(res));
          changeRealName(res);
        }
        
        //console.log(isChangeImage);
    });

    AsyncStorage.getItem("ADDRESS", (err, res) => {
        if (res){
            //changeAddress(JSON.parse(res));
            changeAddress(res);
        }
        
        //console.log(isChangeImage);
    });
    AsyncStorage.getItem("PHONENUMBER", (err, res) => {
      if (res){
          //changeAddress(JSON.parse(res));
          changePhone(res);
      }
    });
    AsyncStorage.getItem("EMAIL", (err, res) => {
      if (res){
          //changeAddress(JSON.parse(res));
          changeEmail(res);
      }
      
      //console.log(isChangeImage);
    });
  
  }, []);
  
  //bs = React.createRef();
  //fall = new Animated.Value(1);

  /* const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  }
    */
    const takePhotoFromCamera = async() => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
            alert('Sorry, we need camera to make this work!');
            return;
            }
        
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            AsyncStorage.setItem("IMAGEPROFILE",JSON.stringify(result.uri));
            setImage(result.uri);
        }
    }

    const choosePhotoFromLibrary = async() => {
        console.log("take photo");
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
            }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            AsyncStorage.setItem("IMAGEPROFILE",JSON.stringify(result.uri));
            setImage(result.uri);
            //changeImage(true);
        }
    }
                {/* onPress={takePhotoFromCamera}> */}
                {/*  onPress={choosePhotoFromLibrary}> */}
    /* const renderInner = () => {
        //return (
            <View style={styles.panel}>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.panelTitle}>Upload Photo</Text>
                    <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
                </View>
                <TouchableOpacity style={styles.panelButton} >
                    <Text style={styles.panelButtonTitle}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
                    <Text style={styles.panelButtonTitle}>Choose From Library</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.panelButton}
                    onPress={() => {console.log("AQ");bs.current.snapTo(1) }}>
                    <Text style={styles.panelButtonTitle}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.panelButton}
                    onPress={() => {console.log("AQ");}}>
                    <Text style={styles.panelButtonTitle}>Test</Text>
                </TouchableOpacity>
            </View>
        //);
    } */
    /* renderInner = () => (
        <View>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => {console.log("AQ");}}>
                <Text style={styles.panelButtonTitle}>Test</Text>
            </TouchableOpacity>
        </View>
    ); */

  /* renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  ); */

    const SaveEverything = () => {
        //AsyncStorage.setItem("IMAGEPROFILE",JSON.stringify(""));
        //AsyncStorage.setItem("IMAGEPROFILE",JSON.stringify(image));
        if (name !== "") {
          AsyncStorage.setItem("NAME",JSON.stringify(name));
          changeRealName(name);
        }
        //if (address !== "") AsyncStorage.setItem("ADDRESS",JSON.stringify(address));
        if (phone !== "") AsyncStorage.setItem("PHONENUMBER",JSON.stringify(phone));
        
        //if (description !== "") AsyncStorage.setItem("DESCRIPTION_PROFILE",JSON.stringify(description));
        
        //changeRealAddress(address);
        
        alert('Success!', [
            {text: 'Okay'}
        ]);
    }


  return (
    <View style={styles.container}>
      {/* <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      /> */} 
        {/* <Animated.View style={{margin: 20,
            opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
            }}> */}


            <View style={{alignItems: 'center'}}>
            
                <View
                style={{
                    height: 100,
                    width: 100,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <ImageBackground
                    source={{
                    uri: image,
                    }}
                    style={{height: 100, width: 100}}
                    imageStyle={{borderRadius: 15}}>
                    <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Icon
                        name="camera"
                        size={35}
                        color="#fff"
                        style={{
                        opacity: 0.7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 10,
                        }}
                    />
                    </View>
                </ImageBackground>
                </View>
            
            <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
                {realName}
            </Text>
            </View>

            <View style={styles.action}>
                <FontAwesome name="user-o" color={colors.text} size={20} />
                <TextInput
                    placeholder="Name"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    onChangeText={(val) => changeName(val)}
                    style={[
                    styles.textInput,
                    {
                        color: colors.text,
                    },
                    ]}
                />
            </View>
            <View style={styles.action}>
                {/* <FontAwesome name="user-o" color={colors.text} size={20} /> */}
                <Feather name="phone" color={colors.text} size={20} />
                <TextInput
                    placeholder="Phone number"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    onChangeText={(val) => changePhone(val)}
                    style={[
                    styles.textInput,
                    {
                        color: colors.text,
                    },
                    ]}
                />
            </View>

            {/* <View style={styles.action}>
            <Feather name="phone" color={colors.text} size={20} />
            <Text>
                {phone}
            </Text>
            </View> */}
            <View style={styles.action}>
            <FontAwesome name="envelope-o" color={colors.text} size={20} />
            <Text>
                    {email}
            </Text>
            </View>
            
            <View style={styles.action}>
              <Icon name="map-marker-outline" color={colors.text} size={20} />
              {/* <TextInput
                  placeholder="Address"
                  placeholderTextColor="#666666"
                  autoCorrect={false}
                  onChangeText={(val) => changeAddress(val)}
                  style={[
                  styles.textInput,
                  {
                      color: colors.text,
                  },
                  ]}
              /> */}
              <Text>
                  {address}
              </Text>
            </View>


            {/* //////////////////////////////////////////// */}

            <View style={styles.panel}>
                <TouchableOpacity style={styles.panelButton} onPress = {takePhotoFromCamera}>
                    <Text style={styles.panelButtonTitle}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
                    <Text style={styles.panelButtonTitle}>Choose From Library</Text>
                </TouchableOpacity>
            </View>

            {/* //////////////////////////////////////////// */}

            <TouchableOpacity style={styles.commandButton} onPress={SaveEverything}>
                <Text style={styles.panelButtonTitle}>Submit</Text>
            </TouchableOpacity>


            
        {/* </Animated.View> */}
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 35,
  },
  panel: {
    padding: 20,
    //backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});