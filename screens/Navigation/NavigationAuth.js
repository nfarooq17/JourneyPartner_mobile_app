import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { createNavigationContainer } from 'react-navigation';
import Home from '../home';
import Onboard from '../Onboard';

import login from '../login';


import Register from '../Register';
import AuthContext from '../../config/context';
import storage from '../../config/storage';
import * as Notifications from 'expo-notifications'
import navigation from "./rootNavigation"



export default function NavigationAuth() {

    useEffect(()=>{

        Notifications.addNotificationResponseReceivedListener((notification) => {
            console.log(notification)
            console.log("NA")
            navigation.naviagte("Profile")
        })
    },[])
    const authContext = useContext(AuthContext)

    const Stack = createStackNavigator();
    return (
       <Stack.Navigator
        initialRouteName = {storage.getBoard()===false ? "Onboard" : "Home"}
       screenOptions={{
           headerShown:false
       }}
       >
           <Stack.Screen name='Onboard' component={Onboard}/>
           <Stack.Screen options={{headerShown:false}} name='Home' component={Home}/>
           <Stack.Screen name='login' component={login}/>
           <Stack.Screen name='Register' component={Register}/>
       </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})
