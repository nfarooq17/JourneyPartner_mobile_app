import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { createNavigationContainer } from 'react-navigation';
import  CreateRoute from '../createRoute';
import AuthContext from '../../config/context';
import DriverDashboard from '../DriverDashboard';
import PassengerDashboard from '../passengerDashboard';
import myRide from '../myRide';
import TabBar from './TabBar';
import Profile from '../profile';



export default function RouteNavigation() {
    const authContext = useContext(AuthContext)
    const Stack = createStackNavigator();
    return (
       <Stack.Navigator>
            <Stack.Screen name='home' component={TabBar}/>
            <Stack.Screen name='Profile' component={Profile}/>
           {authContext.userDetails.isDriver && <Stack.Screen options={{headerShown:false}} name='Create Route' component={CreateRoute}/>}
            <Stack.Screen name='myRide' component={myRide}/>
       </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})
