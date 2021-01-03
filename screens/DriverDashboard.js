import React, { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet,  View,Image } from 'react-native'
import AppButton from '../components/AppButton'
import AuthContext from '../config/context'
import createRoute from './createRoute';
import * as firebase from "firebase"
import 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native'
export default function DriverDashboard({navigation}) {
  const authContext = useContext(AuthContext)
  



    

    return (
        <View style={styles.container}>
                <Image 
      style={styles.img}
      source={require('../assets/logo.png')}
      />
            <View style={styles.btn}>

           <AppButton disabled={!authContext.userDetails.isApproved} title="Create Route" onPress = {() => navigation.navigate('createRoute')}/>
            
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#fff',
      alignItems:'center',
      },
      btn:{
        marginTop:-10,
        width:'100%',
        marginLeft:220
      },
      img: {
        marginTop: 100,
        alignSelf: "center",
        width:190,
        height:170,
        
      },
    
})

