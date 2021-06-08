import React, {Fragment} from 'react';
import {SafeAreaView, StatusBar, View, StyleSheet} from 'react-native';

import Root from './Root';

import * as firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyDEXhgncNZXjbCQNJ8nGjSSq6T-xbL1IHg",
  authDomain: "orderappconzit.firebaseapp.com",
  projectId: "orderappconzit",
  storageBucket: "orderappconzit.appspot.com",
  messagingSenderId: "363190324855",
  appId: "1:363190324855:web:7404f4198827c7b1420072",
  measurementId: "G-5NBN6B4JML",
  databaseURL: "https://orderappconzit-default-rtdb.firebaseio.com/",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Root />
      </SafeAreaView>
    </Fragment>
  );
};

//

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
