import React, { useContext } from 'react'
import { StyleSheet,  View } from 'react-native'
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
            <View style={styles.btn}>

            <AppButton  title="Create Route" onPress = {() => navigation.navigate('createRoute')}/>
            
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
        marginTop:200,
        width:'100%',
        marginLeft:180
      }
    
})

