import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { createNavigationContainer } from 'react-navigation';
import Home from '../home';

import login from '../login';


import Register from '../Register';


export default function NavigationAuth() {
    const Stack = createStackNavigator();
    return (
       <Stack.Navigator>
           <Stack.Screen options={{headerShown:false}} name='Home' component={Home}/>
           <Stack.Screen name='login' component={login}/>
           <Stack.Screen name='Register' component={Register}/>
       </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})
