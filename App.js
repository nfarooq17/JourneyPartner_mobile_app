import { StatusBar } from "expo-status-bar";
import React, {useEffect, useRef, useState} from "react";
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './screens/home';
import Login from './screens/login';
import {DrawerContent} from './screens/Navigation/DrawerContent';
import * as firebase from 'firebase';
import 'firebase/firestore'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  LogBox,
} from "react-native";

import Register from './screens/Register';
import { AppLoading, registerRootComponent } from "expo";
import  AppNavigator from "./screens/Navigation/AppNavigator";
import NavigationAuth from "./screens/Navigation/NavigationAuth";
import DriverDashboard from "./screens/DriverDashboard";
import AuthContext from "./config/context";
import storage from "./config/storage";

import    MapScreen from './screens/MapScreen';
import PasSearch from './screens/PasSearch';
import Profile from "./screens/EditProfile";
import TabBar from "./screens/Navigation/TabBar";
import RouteNavigation from './screens/Navigation/RouteNavigation';
import { navigationRef } from "./screens/Navigation/rootNavigation";
import navigation from "./screens/Navigation/rootNavigation";
import {Notifications} from "expo"


LogBox.ignoreAllLogs();

const firebaseConfig = {
  apiKey: "AIzaSyCQNqyZgj-O5ViMIJlYrE1CWJ23SFcv_TU",
  authDomain: "journey-partner-65289.firebaseapp.com",
  databaseURL: "https://journey-partner-65289.firebaseio.com",
  projectId: "journey-partner-65289",
  storageBucket: "journey-partner-65289.appspot.com",
  messagingSenderId: "652487352209",
  appId: "1:652487352209:web:e71db6943ea363f7108430",
  measurementId: "G-JFGH73WFWV"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default function app() {
  if(storage.getBoard() === false){
    setFirst(false)
  }
  const [first, setFirst] = useState(storage.getBoard())
  const [isReady,setIsReady]=useState(false)

  const [user,setUser]=useState(firebase.auth().currentUser)
  const [userDetails,setUserDetails]=useState()
  
  firebase.auth().onAuthStateChanged(function(fUser) {
    if (fUser) {
      setUser(fUser)
    } else {
      setUser(null)
    }
  });
  const Drawer = createDrawerNavigator();

  const restoreToken = async () => {
    try {
      const u = await firebase.auth().currentUser
      setUser(u)
      const token = JSON.parse(await storage.getToken())
      if(!token) return
      setUserDetails(token)
      console.log(token)
      
    } catch (error) {
      console.log(error)
    }
  }
  


  useEffect(() => {

   

    Notifications.addListener(response => {
      console.log(response)
      if(response.origin === 'selected'){
      navigation.naviagte("myRide")
    }
        });

 
  }, []);

  if(!isReady){ 
    return <AppLoading startAsync={restoreToken} onFinish={()=>setIsReady(true)} />
  }
  
  return (
    <AuthContext.Provider value = {{userDetails, setUserDetails, first, setFirst}}>
   <NavigationContainer ref ={navigationRef}>
      
     {userDetails? <AppNavigator/>  :<NavigationAuth/>}  
  
   {/* <MapScreen /> */}
   </NavigationContainer>
   </AuthContext.Provider>
   
  
   
  );
}


