import  React from 'react';
import { NavigationContainer } from '@react-navigation/native';


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



const Drawer = createDrawerNavigator();



const MyStack = () => {
  return (
    

            
              <Drawer.Navigator drawerContent={props => <DrawerContent {...props} 
              screenOptions={{
                  headerShown:false,
                   backgroundColor:'yellow',
                   activeTintColor:'yellow'
                   
              }}
              />}>
                <Drawer.Screen
                options={{
                    headerShown:false,
                    backgroundColor:'yellow',
                    activeTintColor:'yellow'
                    
                }}
                name="HomeDrawer" component={TabBar} />
               
                
                <Drawer.Screen
                options={{
                    headerShown:false
                }} name="ProfileScreen" component={Profile} />


               
              </Drawer.Navigator>
            










  );
};

export default MyStack;


