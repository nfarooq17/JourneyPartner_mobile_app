// yeh wo wala page hy jo side sy slide ho kr nilkalta hy profile info show hoti hein iss py
// Book marks aur Dark and light theme.

import React,{useContext} from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

 import AuthContext  from '../../config/context';
 import DriverDashboard from '../DriverDashboard';
 //import PassengerDashboard from '../passengerDashboard';
 import Profile from '../profile';
 import PasSearch from '../PasSearch';
 import createRoute from '../createRoute';
 import myRide from '../myRide'
 import * as firebase from "firebase"
 import 'firebase/firestore';
import { color } from 'react-native-reanimated';
export function DrawerContent(props) {

    //const paperTheme = useTheme();
    const authContext = useContext(AuthContext);
    

    

    return(
        <View style={{flex:1, marginTop:40 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    

                    <Drawer.Section style={styles.drawerSection}>
                       {authContext.userDetails.isDriver && <DrawerItem 
                            
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color='yellow'
                                size={size}
                                />
                            )}
                            label="Dashboard"
                            
                            onPress={() => {props.navigation.navigate('DriverDashboard')}}
                        />}
                    {/*!authContext.userDetails.isDriver && <DrawerItem 
                            
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color='yellow'
                                size={size}
                                />
                            )}
                            label="Dashboard"
                            
                            onPress={() => {props.navigation.navigate('PassengerDashboard')}}
                            />*/}
                        {!authContext.userDetails.isDriver && <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="magnify" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Search"
                            onPress={() => {props.navigation.navigate('PasSearch')}}
                        />}
                      { authContext.userDetails.isDriver && <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Create Route"
                            onPress={() => {props.navigation.navigate('createRoute')}}
                        />}
                         <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="myRide"
                            onPress={() => {props.navigation.navigate('myRide')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        
                      
                       
                    </Drawer.Section>
                    
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                     onPress={() => firebase.auth().signOut()}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 25,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });