import React,{useContext} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
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
import storage from '../../config/storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Route from '../route';
import colors from '../../config/colors';


// import Svg , {Polygon} from 'react-native-svg';
// const {width , hieght} = Dimensions.get('screen')
export function DrawerContent(props) {

    //const paperTheme = useTheme();
    const authContext = useContext(AuthContext);
    

    

    return(
        <View style={{flex:1, }}>
            <DrawerContentScrollView {...props}>
                
                <View style={styles.drawerContent}>
                    {/* <Svg width={width} height={height} viewBox={`0 0 ${width} ${hieght}`}>
                        <Polygon
                        fill='red'
                        points={`0,0 ${width},0 ${width}, ${hieght} 0 , ${hieght} `}
                        />
                    </Svg> */}
                <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity
                            onPress={()=> props.navigation.navigate('Profile')}>

                            <Avatar.Image 
                                source={{
                                    uri:authContext.userDetails.image
                                }}
                                size={50}
                                onPress={()=> navigation.navigate('Profile')}
                                />
                                </TouchableOpacity>
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Title style={styles.title}>{authContext.userDetails.name}</Title>
                                <Caption style={styles.caption}>{authContext.userDetails.contact}</Caption>
                            </View>
                        </View>

                        
                    </View>
                    

                    <Drawer.Section style={styles.drawerSection}>
                        
                       {authContext.userDetails.isDriver && <DrawerItem 
                       style={styles.itemSection}
                             
                            icon={({ size}) => (
                                <Icon 
                                name="home-outline" 
                                color='#FFD300'
                                size={size}
                                />
                            )}
                            label="Dashboard"
                            labelStyle={
                                {
                                    color:colors.white
                                }
                            }
                            
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
                        style={styles.itemSection}
                            icon={({color, size}) => (
                                <Icon 
                                name="magnify" 
                                color='#FFD300'
                                size={size}
                            
                                />
                            )}
                            label="Search"
                            labelStyle={{
                                color:colors.white
                            }}
                            
                            onPress={() => {props.navigation.navigate('PassengerDashboard')}}
                        />}
                      
                         { authContext.userDetails.isDriver && <DrawerItem 
                      style={styles.itemSection}
                            icon={({color, size}) => (
                                <Icon 
                                name="map-marker-path" 
                                color='#FFD300'
                                size={size}
                                />
                            )}
                            label="Route"
                            labelStyle={{
                                color:colors.white
                            }}
                            onPress={() => {props.navigation.navigate('Route')}}
                        />}
                         <DrawerItem 
                         style={styles.itemSection}
                            icon={({color, size}) => (
                                <Icon 
                                name="car" 
                                color='#FFD300'
                                size={size}
                                />
                            )}
                            label="myRide"
                            labelStyle={{
                                color:colors.white
                            }}
                            onPress={() => {props.navigation.navigate('myRide')}}
                        />
                        <DrawerItem 
                        style={styles.itemSection}
                            icon={({size}) => (
                                <Icon 
                                name="account-outline" 
                                color='#FFD300'
                                size={size}
                                />
                            )}
                            label="Profile"
                            labelStyle={{
                                color:colors.white,
                                fontFamily:'bold'
                           
                            }}
                            
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem 
                style={styles.itemSection1}
                    icon={({size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color='#FFD300'
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    labelStyle={{
                        color:colors.white
                    }}
                     onPress={() => {authContext.setUserDetails(null),storage.removeToken(),firebase.auth().signOut()}}
                />
                        
                      
                       
                    </Drawer.Section>
                    
                </View>
            </DrawerContentScrollView>
            {/* <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                style={styles.itemSection1}
                    icon={({size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color='#FFD300'
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    labelStyle={{
                        color:colors.white
                    }}
                     onPress={() => {authContext.setUserDetails(null),storage.removeToken(),firebase.auth().signOut()}}
                />
            </Drawer.Section> */}
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
      
    },
    itemSection:{
        width:"140%",
        borderRadius:10,
        marginTop: 1,
        backgroundColor:colors.green,
        color:colors.green
    },
    itemSection1:{
        width:"100%",
        borderRadius:10,
        marginTop: 260,
        backgroundColor:colors.green,
        color:colors.green
    },
    userInfoSection: {
      width:'100%',
      backgroundColor:colors.green,
      paddingTop:50,
      paddingLeft: 20,
      paddingBottom:10,
      borderWidth:1,
      borderRadius:15,
      borderTopColor:'transparent',
      borderLeftColor:'transparent',
      borderRightColor:'transparent',
      borderBottomColor:'green'
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
      color:colors.white
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      color: colors.white
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 60,
      marginBottom:10,
      backgroundColor:colors.green

    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
      
    },
    bottomDrawerSection: {
        
        marginBottom: 20,
      
        borderTopWidth: 1,
        

    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });