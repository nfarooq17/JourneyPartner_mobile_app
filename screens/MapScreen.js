import React, { useContext, useEffect, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import AuthContext from '../config/context';
import colors from '../config/colors';
import * as firebase from "firebase"
import 'firebase/firestore';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import getLocation from '../config/getLocation';
import * as Location from 'expo-location'
import AppButton from '../components/AppButton';



function MapScreen({navigation,goToFeed, canDrag = false, data, ...otherProps}) {
let location = getLocation()
const [listing,setListing] = useState()
async function loadLocation(){
   location = getLocation()
}

const authContext = useContext(AuthContext)

async function handleEndRide() {
    console.log(authContext.userDetails.name)
    const postRef = await firebase.firestore().collection('ride').where('owener','==',authContext.userDetails.docId).get()
    setListing(postRef.docs.map((doc)=>({data: doc.data()})))
    console.log("values1")
    
    let values = {
        time: firebase.firestore.FieldValue.serverTimestamp(),
        addressLocation: location,
        dname: authContext.userDetails.name,
        owener: authContext.userDetails.docId,
        
    }
    console.log(values)

    firebase.firestore().collection('trips').add(values)
    console.log("values")

}

useEffect(()=>{
   loadLocation()
})





    return (
    <View style={styles.container}>

        <MapView style={styles.mapStyle}

                region={{
                    latitude: location ? location.latitude : 30.3753,
                    longitude: location ? location.longitude : 69.3451,
                    latitudeDelta:  location ? 0.01:4,
                    longitudeDelta: location ? 0.01:4
                }}

        >
            <Marker
            pinColor = {colors.secondary}
                style ={{borderColor: colors.secondary}}
                draggable ={canDrag}
                
                onDragEnd={(value)=>{
                    location = value.nativeEvent.coordinate,
                    console.log(location)
                }}
                coordinate = {location? location : {latitude: 1, longitude: 1}}
                title = "You"
             >
             </Marker>
        
            
            
            </MapView>
            <AppButton title='end Ride' onPress={()=>handleEndRide()}/>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height-80,
    },
  });


export default MapScreen;