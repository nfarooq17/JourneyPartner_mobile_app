/*import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, TouchableHighlight } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'

import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase"
import 'firebase/firestore';
import ActivityIndicator from "../components/ActivityIndicator";








function PassengerDashboard ({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [loading,isLoading]=useState(false)
  


  async function loaddata() {
    isLoading(true)
    const postRef = await firebase.firestore().collection("route").orderBy("time", "desc").get()
    setListings(postRef.docs.map((doc)=>({id: doc.id, data: doc.data()})))
    postRef.forEach(doc => {
        console.log("Logged In")
        })
    isLoading(false)
  }

  const [listings,setListings] = useState()
  useEffect(()=> {
      loaddata();

  },[])

  return (
    <Screen style={styles.screen}>
      
      <FlatList
        data={listings}
        refreshing={refreshing}
        onRefresh={() => {
          loaddata();
        }}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            feedImageStyle = {styles.feedImageStyle}
            isFeedPost            
            from={item.data.from}
            where={item.data.where}

            
            onPress = {()=> navigation.navigate("Profile", item.data)}
          />
        )}
      />
    </Screen>
  );

  
  
}



const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  feedStyle: {
      height: 500,
      borderRadius: 40,
      marginHorizontal: 20,
      
  },
  button: {
    width: 45 ,height: 45,
  },
  feedImageStyle: {
    aspectRatio: 1,
    alignSelf: "center",
    height: "85%",

  }
});

export default PassengerDashboard;*/
import React, { useContext, useEffect, useRef, useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as firebase from "firebase"
import 'firebase/firestore';


import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import AuthContext from '../config/context';
import AppTextInput from "../components/AppTextInput";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";


function PassengerDashboard({navigation}) {
  const [listings, setListings] = useState();
  const [searchText, setSearchText] = useState("");
  const authContext = useContext(AuthContext);
  const [loading,isLoading]=useState(false);

  const textInput = React.useRef();

  const clearInput = () => (textInput.current.value = "");

  useEffect(()=> {
    loaddata();

},[searchText])

  async function loaddata() {
    setListings(null)
    isLoading(true)
    const postRef = await firebase.firestore().collection("route").get()
    setListings(postRef.docs.map((doc)=>({id: doc.id, data: doc.data()})))
    let data =[]
    
    if(searchText!==null || searchText!==""){
    postRef.forEach(doc => {
          if(String(doc.data().where).toLowerCase().startsWith(String(searchText).toLowerCase())){
            data.push({id: doc.id, data: doc.data()})
          }
        })
    setListings(data)
    isLoading(false)
    return
  }
  isLoading(false)
  }

 function clearSearch(){
  setSearchText("");

  }

 

  return (
    <Screen style={styles.screen}>
      <View>

      <View style={{flexDirection: "row", alignItems: "center"}} >
      <AppTextInput  defaultValue={searchText} ct = {true} width="85%" otherStyle={{backgroundColor: colors.white  }} onChangeText={text => setSearchText(text)} placeholder = "Search Here"/>
      {/* <MaterialCommunityIcons name="check-circle" size={45} color={colors.secondary} onPress={()=>loaddata()}  /> */}
      <MaterialCommunityIcons name={searchText==""?"search-web":"close-circle"} size={40} color={colors.primary} onPress={()=>{clearSearch()}}/>
      </View>
      {
        loading && <Image style = {styles.loading} source={require('../assets/loading.gif')}  />
            }
      <FlatList
        data={listings}
        keyExtractor={(listings) => listings.id.toString()}
        renderItem={({ item }) => (
          
          <Card
            from={item.data.from}
            where={item.data.where}
            seats={item.data.seats}
            date= {item.data.date}
            total={item.data.totalEx}
            
            
            onPress={()=> navigation.navigate("Driver Profile", item)}
          />
          )}
          />
          </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  loading: {
    height: 300,
    width : 300,
    alignSelf: "center"
  },
});

export default PassengerDashboard;

