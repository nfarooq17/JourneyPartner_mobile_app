import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AppText from '../components/AppText';
import Screen from '../components/Screen'
import colors from '../config/colors';
import ListItemSeparator from "../components/lists/ListItemSeparator"
import ListItem from "../components/lists/ListItem"
import AppButton from '../components/AppButton';
import * as firebase from "firebase"
import 'firebase/firestore';
import AuthContext from '../config/context';


async function sendPushNotification(nToken, title ) {
    const message = {
      to: nToken,
      sound: 'default',
      title: title,
      data: { _displayInForeground : true },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  
  }
  

function RideDetails({route, navigation}) {
    const items = route.params;
    const authContext = useContext(AuthContext)

    const acceptRide = async () => {
        await firebase.firestore().collection('ride').doc(items.id).update({isAccepted: true})
        const user = await firebase.firestore().collection('user').doc(item.data.pId).get()
        const token = user.data().nToken
        sendPushNotification(token, authContext.userDetails.name + "Has accepted your request")
        navigation.goBack();
    }
    const rejectRide = async () => {
        await firebase.firestore().collection('ride').doc(items.id).delete();
        const user = await firebase.firestore().collection('user').doc(item.data.pId).get()
        const token = user.data().nToken
        sendPushNotification(token, authContext.userDetails.name + "Has rejected your request")
        navigation.goBack();
    }
    function getDate(time){
        console.log(time)
        let date = new Date(time*1000)
    
        return date.toLocaleDateString() 
    }

    return (

        <Screen>
            <View style = {styles.container}>
               {authContext.userDetails.isDriver && <AppText style = {styles.titleheader}>{items.data.name} Requested a ride</AppText>}
               {!authContext.userDetails.isDriver && <AppText style = {styles.titleheader}>{items.data.dName}</AppText>}
               
                <AppText>from: {items.data.from.label}</AppText>
                <AppText>where: {items.data.where.label}</AppText>
                <AppText>Date: {getDate(items.data.date.seconds)} </AppText>
    <AppText>Status:{items.data.isAccepted&&<AppText>Accepted</AppText>}{!items.data.isAccepted&&<AppText>Pending</AppText>}</AppText>

            </View>
            <FlatList
                data={items.data.details}
                keyExtractor={(message) => message.id}
                renderItem={({ item }) => (
                <View style={{flexDirection: "row"}}>
                    <View style={{flex: 1}}>
                        <ListItem
                            title={item.data.name}
                            subTitle={item.data.from.label}
                            onPress={() => console.log("Message selected")}
                /></View>
                </View>
                )}
                ItemSeparatorComponent={ListItemSeparator}
                
             />
             
             {(authContext.userDetails.isDriver === true && items.data.isAccepted===false) && <View style ={{padding: 20}}>
                <View style={{right:-200}}>

                 <AppButton title ="Accept Ride" onPress={()=>acceptRide()}></AppButton>
                 <AppButton style={{backgroundColor:'red'}} title ="Reject Ride" onPress={() => rejectRide()}></AppButton>
                </View>
                 
                 </View>}
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.light,
        borderRadius: 25,
        marginHorizontal: 20
    },
    titleheader: {
        fontSize: 28,
        fontWeight: "500"
    },
    totalStyle: {
      flexDirection: "row-reverse",
      padding: 20,
      justifyContent:"center",
      backgroundColor: colors.primary
    }
})


export default RideDetails;