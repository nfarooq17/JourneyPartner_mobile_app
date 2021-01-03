import React, { useContext, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import * as firebase from "firebase"
import 'firebase/firestore';



import { createDrawerNavigator } from '@react-navigation/drawer';
import {DrawerContent}  from './DrawerContent';

// import { createStackNavigator } from '@react-navigation/stack';
// import {createAppContainer} from 'react-navigation';
// import HomeScreen from './HomeScreen'
import TabBar from './TabBar';

import Profile from '../profile';
import PassengerDashboard from '../passengerDashboard';
import CreateRoute from '../createRoute';
import DriverDashboard from '../DriverDashboard';

import navigation from "./rootNavigation"
// import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'
import AuthContext from '../../config/context';



const Drawer = createDrawerNavigator();



const AppNavigator = () => {
  const authContext = useContext(AuthContext)

  useEffect(()=>{
    registerForPushNotifications()

    Notifications.addNotificationResponseReceivedListener(() => {
        navigation.naviagte("myRide")
    })
    
},[])

const registerForPushNotifications = async () => {

    try {
        console.log("Hello")
        const permission =  await Permissions.askAsync(Permissions.NOTIFICATIONS)
        console.log("Hello")
        if(!permission.granted) return;
        console.log("Hello")

        const token = await Notifications.getExpoPushTokenAsync();
        console.log("Hello")

        console.log(token)
        firebase.firestore().collection("user").doc(authContext.userDetails.docId).update({nToken: token.data})
        
    } catch (error) {
        console.log("Error Getting Push Notification", error )
    }
}
  return (
    

            
              <Drawer.Navigator drawerContent={props => <DrawerContent {...props} 
              
              
           
              />}>
                <Drawer.Screen
                options={{
                    headerShown:false,
                    
                }}
                name="HomeDrawer" component={TabBar} />
               
                
                <Drawer.Screen
                options={{
                    headerShown:false
                }} name="ProfileScreen" component={Profile} />


               
              </Drawer.Navigator>
            










  );
};

export default AppNavigator;


