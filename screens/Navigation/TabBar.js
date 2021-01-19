import React,{useContext, useEffect} from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DriverDashboard from '../DriverDashboard';
import PassengerDashboard from '../passengerDashboard';

import Profile from '../profile';

import EditProfile from '../EditProfile';
import Notification from '../notification';


import {useTheme, Avatar} from 'react-native-paper';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Home from '../home';
import PasSearch from '../PasSearch';
import createRoute from '../createRoute';
import myRide from '../myRide';
import Texting from '../Texting';
import AuthContext from '../../config/context';
import DriverDetails from '../DriverDetails';
import RideDetails from '../rideDetails';
import Route from '../route';
import * as Notifications from 'expo-notifications'
import DriverNotification from '../driverNotification';
import indTexting from '../indTexting';
import MapScreen from '../MapScreen';




const HomeStack = createStackNavigator();
const RideStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const VendorsStack = createStackNavigator();
const TextingNavigator = createStackNavigator();
const TrackingStack = createStackNavigator();


const Tab = createMaterialBottomTabNavigator();

const TabBar = () => (
  
  
  <Tab.Navigator 
  screenOptions={{
    headerShowen:false,
    
    
    
  }}
  initialRouteName="HomeStackScreen" activeColor="#FFD300" 
   >
  <Tab.Screen
    name="Home"
    component={HomeStackScreen}
    options={{
      tabBarLabel: 'Home',
      tabBarColor: '#1E5254',
      activeBackgroundColor:'#1E5254',
      tabBarIcon: ({color}) => (
        <Icon name="ios-home" color={color} size={26} />
      ),
      
    }}
  />
  <Tab.Screen
    name="indTexting"
    headerShowen={false}
    component={texting}
    options={{
      
      tabBarLabel: 'Text',
      activeBackgroundColor:'#1E5254',
      tabBarColor: '#1E5254',
      tabBarIcon: ({color}) => (
        <Icon name="ios-text" color={color} size={26} />
      ),
      
    }}
  />
  <Tab.Screen
    name="Notification"
    component={Notification}
    options={{
      tabBarLabel: 'Notification',
      tabBarColor: '#1E5254',
      activeBackgroundColor:'#1E5254',
      tabBarIcon: ({color}) => (
        <Icon name="ios-notifications" color={color} size={26} />
      ),
    }}
  />
 
  <Tab.Screen
    name="Profile"
    component={ProfileStackScreen}
    options={{
      tabBarLabel: 'Profile',
      tabBarColor: '#1E5254',
      activeBackgroundColor:'#1E5254',
      tabBarIcon: ({color}) => (
        <Icon name="ios-person" color={color} size={26} />
      ),
    }}
  />
  
</Tab.Navigator>

);

export default TabBar;

const HomeStackScreen = ({navigation}) => {
  const authContext =  useContext(AuthContext)
  const {colors} = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShowen:false,
        headerStyle: {
          
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
     {!authContext.userDetails.isApproved && authContext.userDetails.isApproved &&authContext.userDetails.isDriver&&
     <HomeStack.Screen
     name="DriverDashboard"
     component={DriverNotification}
     options={{
          headerShowen:false,
          title: 'Home',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => navigation.openDrawer()}
                
              />
            </View>
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
            
              <TouchableOpacity
                style={{paddingHorizontal: 10, marginTop: 5}}
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                <Avatar.Image
                  source={{
                    uri:
                    authContext.userDetails.image,
                  }}
                  size={30}
                  />
              </TouchableOpacity>
            </View>
          ),
        }}
        />
      } 
      {authContext.userDetails.isDriver&&
     <HomeStack.Screen
     name="DriverDashboard"
     component={DriverDashboard}
     options={{
          headerShowen:false,
          title: 'Home',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => navigation.openDrawer()}
                
              />
            </View>
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
            
              <TouchableOpacity
                style={{paddingHorizontal: 10, marginTop: 5}}
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                <Avatar.Image
                  source={{
                    uri:
                    authContext.userDetails.image,
                  }}
                  size={30}
                  />
              </TouchableOpacity>
            </View>
          ),
        }}
        />
      } 
      <HomeStack.Screen
        name="PassengerDashboard"
        component={PassengerDashboard}
        options={{
          headerShowen:false,
          title: 'Home',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => navigation.openDrawer()}
                
              />
            </View>
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
            
              <TouchableOpacity
                style={{paddingHorizontal: 10, marginTop: 5}}
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                <Avatar.Image
                  source={{
                    uri:
                      authContext.userDetails.image
                  }}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    
     <HomeStack.Screen
        name="createRoute"
        component={createRoute}/>
        <HomeStack.Screen
        name="Route"
        component={Route}/>
         <HomeStack.Screen
        name="MapScreen"
        
        component={MapScreen}
 />
 
         <HomeStack.Screen
        name="Driver Profile"
        component={DriverDetails}/>
        <HomeStack.Screen
        name="myRide"
        component={RideStackScreen}/>
        
    </HomeStack.Navigator>
    
  );
};
const RideStackScreen=({navigation})=>{
 
   return(

     <RideStack.Navigator
     
     >
     <RideStack.Screen
     name="myRide"
     component={myRide}/>
  <RideStack.Screen
  name="Ride Details"
  component={RideDetails}/>
  </RideStack.Navigator>
); 
}


const ProfileStackScreen = ({navigation}) => {
  const {colors} = useTheme();

  useEffect(()=>{

    Notifications.addNotificationResponseReceivedListener((notification) => {
        navigation.naviagte("Profile")
        console.log(notification)
    })
},[])


  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile Screen',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: 'Edit Profile',
        }}
        component={EditProfile}
      />
    </ProfileStack.Navigator>
  );
};
const texting = ({navigation}) => {
  const {colors} = useTheme();



  return (
    <TextingNavigator.Navigator
    
      screenOptions={{
  
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <TextingNavigator.Screen
      headerShowen={false}
        name="Texting"
        component={Texting}
        // options={{
        //   title: 'Profile Screen',
        // }}
      />
      <TextingNavigator.Screen
      headerShowen={false}
        name="indTexting"
        // options={{
        //   title: 'Edit Profile',
        // }}
        component={indTexting}
      />
    </TextingNavigator.Navigator>
  );
};


const mapStackScreen = ({navigation}) => {
  const {colors} = useTheme();

  


  return (
    <TrackingStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <TrackingStack.Screen
        name="Tracking"
        component={MapScreen}
 
      />

    </TrackingStack.Navigator>
  );
};










// Bottom tab

