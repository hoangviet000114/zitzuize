import React from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as firebase from "firebase";
import { host } from '../model/host';
//import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';

const SignUpScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        id: 0,
        name: '',
        username: '',
        password: '',
        confirm_password: '',
        phoneNumber: '',
        check_NameInput: false,
        check_textInputChange: false,
        check_Phone: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });


    const Register = async (nameX, userNameX, passwordX, confirm_passwordX, phoneNumberX) => {

        let temp = false;
        if (nameX === '')
            Alert.alert('Bạn chưa nhập tên!', 'Mời bạn nhập lại.', [
                { text: 'Okay' }
            ]);
        else if (userNameX === '')
            Alert.alert('Bạn chưa nhập mail!', 'Mời bạn nhập lại.', [
                { text: 'Okay' }
            ]);
        else if (phoneNumberX === '')
            Alert.alert('Bạn chưa nhập số điện thoại!', 'Mời bạn nhập lại.', [
                { text: 'Okay' }
            ]);
        else if (passwordX === '')
            Alert.alert('Bạn chưa nhập mật khẩu!', 'Mời bạn nhập lại.', [
                { text: 'Okay' }
            ]);
        else if (confirm_passwordX === '')
            Alert.alert('Bạn chưa nhập xác nhận mật khẩu!', 'Mời bạn nhập lại.', [
                { text: 'Okay' }
            ]);
        else if (passwordX !== confirm_passwordX)
            Alert.alert('Bạn nhập xác nhận mật khẩu sai!', 'Mời bạn nhập lại.', [
                { text: 'Okay' }
            ]);



        else firebase
            .auth()
            .createUserWithEmailAndPassword(userNameX, passwordX)
            .then(async () => {
                //temp = true;
                let sl;
                let y = await firebase.database().ref("/NumOfUser/NumOfUser").once('value').then((snapshot) => {
                    sl = snapshot.val() + 1;
                    console.log(sl);
                });

                console.log(sl);


                var user = await firebase.auth().currentUser;

                let eee = await user.updateProfile({
                    /* Name: nameX,
                    PhoneNumber: phoneNumberX,
                    ID: sl + 1 */
                    displayName: sl
                }).then(function () {
                    firebase.database().ref("/NumOfUser/").set({
                        NumOfUser: sl
                    });
                    firebase.database().ref("/User/" + sl).set({
                        Name: nameX,
                        phoneNumber: phoneNumberX,
                    });

                    user.sendEmailVerification().then(function () {
                        // Email sent.
                        firebase.auth().signOut().then(function () {
                            // Sign-out successful.
                        }).catch(function (error) {
                            // An error happened.
                        });

                        // Update successful.
                    }).catch(function (error) {
                        // An error happened.
                    });

                    /* let ppp = await user.sendEmailVerification().then(function() {
                    // Email sent.
                        firebase.auth().signOut().then(function() {
                            // Sign-out successful.
                        }).catch(function(error) {
                            // An error happened.
                        }); */

                }).catch(function (error) {
                    // An error happened.
                });

                Alert.alert('Thành công!', 'Kiểm tra email được gửi về để xác thực tài khoản.', [
                    { text: 'Okay' }
                ]);
            })
            .catch(error => {
                Alert.alert('Lỗi rồi!', 'Mời bạn đăng ký lại.', [
                    { text: 'Okay' }
                ]);
                console.log(error);
            });

        console.log(temp);

        /* if (temp){
            let sl = firebase.database().ref("/NumOfUser/");

            console.log(sl);


            var user = firebase.auth().currentUser;
            user.updateProfile({
                Name: nameX,
                PhoneNumber: phoneNumberX,
                ID: sl + 1
              }).then(function() {
                firebase.database().ref("NumOfUser").set(sl + 1);
                // Update successful.
              }).catch(function(error) {
                // An error happened.
              });
        } */

        //navigation.navigate('VerifyScreen');
    }

    const nameChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                name: val,
                check_NameInput: true
            });
        } else {
            setData({
                ...data,
                name: val,
                check_NameInput: false
            });
        }
    }

    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#FF6347' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {}}
                >
                <LinearGradient
                    colors={['#FFA07A', '#FF6347']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#FF6347',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#FF6347'
                    }]}>Sign In</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#FF6347'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });
