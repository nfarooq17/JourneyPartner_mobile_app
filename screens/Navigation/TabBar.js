import React,{useContext} from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DriverDashboard from '../DriverDashboard';
import PassengerDashboard from '../passengerDashboard';
// import NotificationScreen from './NotificationScreen';
// import ExploreScreen from './ExploreScreen';
import Profile from '../profile';
// import MapTestScreen from './MapTestScreen';
import EditProfile from '../EditProfile';


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


const HomeStack = createStackNavigator();
const RideStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const VendorsStack = createStackNavigator();


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
      tabBarColor: '#000',
      activeBackgroundColor:'#000',
      tabBarIcon: ({color}) => (
        <Icon name="ios-home" color={color} size={26} />
      ),
      
    }}
  />
  <Tab.Screen
    name="hello"
    component={Texting}
    options={{
      tabBarLabel: 'Home',
      activeBackgroundColor:'#000',
      tabBarColor: '#000',
      tabBarIcon: ({color}) => (
        <Icon name="ios-text" color={color} size={26} />
      ),
      
    }}
  />
  <Tab.Screen
    name="Vendors"
    component={Profile}
    options={{
      tabBarLabel: 'Profile',
      tabBarColor: '#000',
      activeBackgroundColor:'#000',
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
      tabBarColor: '#000',
      activeBackgroundColor:'#000',
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
        name="Driver"
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
                      authContext.userDetails.Image
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
        name="Driver Profile"
        component={DriverDetails}/>
        <HomeStack.Screen
        name="PassSearch"
        component={PasSearch}/>
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
     <HomeStack.Screen
     name="myRide"
     component={myRide}/>
  <HomeStack.Screen
  name="Ride Details"
  component={RideDetails}/>
  </RideStack.Navigator>
); 
}

/*const VendorsStackScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <VendorsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <VendorsStack.Screen
        name="CardListScreen"
        component={CardListScreen}
        options={{
          title: 'Vendor Category',
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

      <VendorsStack.Screen 
        name="VendorsOfSpecificCategory"
        component={VendorsOfSpecificCategory}
        options={({route}) => ({
          title: 'Vendors',
          headerBackTitleVisible: false,
          // headerTitle: false,
          // headerTransparent: true,
          headerTintColor: '#000000'
        })}
      />
      <VendorsStack.Screen 
        name="CardItemDetails"
        component={CardItemDetails}
        options={({route}) => ({
          // title: route.params.title,
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff'
        })}
      />
      
    </VendorsStack.Navigator>
  );
};
*/





















// const NotificationStackScreen = ({navigation}) => (
//   <NotificationStack.Navigator
//     screenOptions={{
//       headerStyle: {
//         backgroundColor: '#1f65ff',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     }}>
//     <NotificationStack.Screen
//       name="Notifications"
//       component={NotificationScreen}
//       options={{
//         headerLeft: () => (
//           <Icon.Button
//             name="ios-menu"
//             size={25}
//             backgroundColor="#1f65ff"
//             onPress={() => navigation.openDrawer()}
//           />
//         ),
//       }}
//     />
//   </NotificationStack.Navigator>
// );

const ProfileStackScreen = ({navigation}) => {
  const {colors} = useTheme();

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
          // headerRight: () => (
          //   <View style={{marginRight: 10}}>
          //     <MaterialCommunityIcons.Button
          //       name="account-edit"
          //       size={25}
          //       backgroundColor={colors.background}
          //       color={colors.text}
          //       onPress={() => navigation.navigate('EditProfile')}
          //     />
          //   </View>
          // ),
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








// Bottom tab

