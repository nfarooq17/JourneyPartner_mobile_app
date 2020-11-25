import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

//import preLogin from './screens/preLogin';
import Home from './screens/home';
import Login from './screens/login';
import {DrawerContent} from './screens/Navigation/DrawerContent';


/*import AppTextInput from './components/AppTextInput';
import AppButton from './components/AppButton';
import Register from './screens/Register';
import Profile from './screens/profile';*/

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
/*import PreLogin from "./screens/preLogin";
import forgotpassword2 from "./screens/forgotpassword2";
import newPassword from "./screens/newPassword";
import Psignup from './screens/psignup';
import DriverSignup from "./screens/driverSignup";

import ImgHeader from './components/ImgHeader';
import CreateRoute from './screens/createRoute'
import dashboard from "./screens/dashboard";*/
//import Search from "./screens/search";
import Register from './screens/Register';
import { AppLoading, registerRootComponent } from "expo";
import  MyStack from "./screens/Navigation/AppNavigator";
import NavigationAuth from "./screens/Navigation/NavigationAuth";
import DriverDashboard from "./screens/DriverDashboard";
import AuthContext from "./config/context";
import storage from "./config/storage";

import    MapScreen from './screens/MapScreen';
//import Profile from "./screens/profile";
import PasSearch from './screens/PasSearch';
import Profile from "./screens/EditProfile";
import TabBar from "./screens/Navigation/TabBar";
import RouteNavigation from './screens/Navigation/RouteNavigation';

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

  if(!isReady){ 
    return <AppLoading startAsync={restoreToken} onFinish={()=>setIsReady(true)} />
  }
  
  return (
    <AuthContext.Provider value = {{userDetails, setUserDetails}}>
   <NavigationContainer>
      
    
    {userDetails? <MyStack/>  :<NavigationAuth/>}

     
   </NavigationContainer>
   </AuthContext.Provider>
   
   
  
   
  );
}


