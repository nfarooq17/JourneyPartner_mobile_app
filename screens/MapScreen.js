import React, { useContext, useEffect, useState } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import AuthContext from "../config/context";
import colors from "../config/colors";
import * as firebase from "firebase";
import "firebase/firestore";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import getLocation from "../hooks/getLocation";
import * as Location from "expo-location";
import AppButton from "../components/AppButton";
import { NavigationEvents } from "react-navigation";

function MapScreen({
  route,
  navigation,
  goToFeed,
  canDrag = false,
  data,
  ...otherProps
}) {
  const list = route.params;
  console.log(list.data);
  let location = getLocation();
  const StartingLocation = getLocation();
  const [listing, setListing] = useState();
  async function loadLocation() {
    location = getLocation();
  }

  const authContext = useContext(AuthContext);

  async function handleEndRide() {
    const endLocation = location;
    console.log(authContext.userDetails.name);
    const postRef = await firebase
      .firestore()
      .collection("ride")
      .where("owener", "==", authContext.userDetails.docId)
      .get();
    setListing(postRef.docs.map((doc) => ({ data: doc.data() })));

    let number = list.data.totalEx;
    let balance = (5 / 100) * number;
    // let percentageForDriver = number - percentageForAdmin;

    let values = {
      time: firebase.firestore.FieldValue.serverTimestamp(),
      addressLocation: location,
      dname: authContext.userDetails.name,
      owener: authContext.userDetails.docId,
      startingLocation: StartingLocation,
      endingLocation: endLocation,
      balance: balance,
    };
    console.log(values);
    console.log("hogya");

    firebase.firestore().collection("trips").add(values);
    console.log("hogya2");
    navigation.goBack();
    firebase
      .firestore()
      .collection("user")
      .doc(list.data.docId)
      .update({ Balance: balance });

    console.log(values);
    console.log(balance);
  }

  useEffect(() => {
    loadLocation();
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.mapStyle}
          region={{
            latitude: location ? location.latitude : 30.3753,
            longitude: location ? location.longitude : 69.3451,
            latitudeDelta: location ? 0.01 : 4,
            longitudeDelta: location ? 0.01 : 4,
          }}
        >
          <Marker
            
            pinColor={colors.secondary}
            style={{ borderColor: colors.secondary }}
            image={require('../assets/marker.png')}
            draggable={canDrag}
            onDragEnd={(value) => {
              (location = value.nativeEvent.coordinate), console.log(location);
            }}
            coordinate={location ? location : { latitude: 1, longitude: 1 }}
            title={authContext.userDetails.name}
            >
            {/* <Image source ={require('../assets/logo.png')}  /> */}
          </Marker>
        </MapView>
      )}
      <AppButton title="end Ride" onPress={() => handleEndRide()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 250,
  },
});

export default MapScreen;
