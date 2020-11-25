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




function RideDetails({route, navigation}) {
    const items = route.params;
    const authContext = useContext(AuthContext)

    const acceptRide = async () => {
        await firebase.firestore().collection('ride').doc(items.id).update({isAccepted: true})
        navigation.goBack();
    }
    const rejectRide = async () => {
        await firebase.firestore().collection('ride').doc(items.id).delete();
        navigation.goBack();
    }

    return (

        <Screen>
            <View style = {styles.container}>
                <AppText style = {styles.titleheader}>{items.data.name}</AppText>
                <AppText>from: {items.data.from}</AppText>
                <AppText>Address: {items.data.where}</AppText>

            </View>
            <FlatList
                data={items.data.details}
                keyExtractor={(message) => message.id}
                renderItem={({ item }) => (
                <View style={{flexDirection: "row"}}>
                    <View style={{flex: 1}}>
                        <ListItem
                            title={item.data.name}
                            subTitle={item.data.from}
                            onPress={() => console.log("Message selected")}
                /></View>
                </View>
                )}
                ItemSeparatorComponent={ListItemSeparator}
                
             />
             
             {(authContext.userDetails.isDriver === true && items.data.isAccepted===false) && <View style ={{padding: 20}}>

                 <AppButton title ="Accept Ride" onPress={()=>acceptRide()}></AppButton>
                 <AppButton style={{backgroundColor:'red'}} title ="Reject Ride" onPress={() => rejectRide()}></AppButton>
                 
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