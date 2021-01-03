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


function Route({navigation}) {
  const [listings, setListings] = useState();
  const [searchText, setSearchText] = useState("");
  const authContext = useContext(AuthContext);
  const [loading,isLoading]=useState(false);
  const [rate , setRate] = useState();


 

  useEffect(()=> {
    loaddata();

},[searchText])

  async function loaddata() {
    setListings(null)
    isLoading(true)
    const postRef = await firebase.firestore().collection("route").where("owener",'==',authContext.userDetails.docId).get()
    setListings(postRef.docs.map((doc)=>({id: doc.id, data: doc.data()})))
    let data =[]
    // const rateRef= await firebase.firestore().collection('reviews').where('owener' , '===' , listings.data.owner)
    // reatRef.forEach(doc=>{

    // })
    
    
  isLoading(false)
  }

 function clearSearch(){
  setSearchText("");

  }

 

  return (
    <Screen style={styles.screen}>
      <View>
      <FlatList
        data={listings}
        keyExtractor={(listings) => listings.id.toString()}
        renderItem={({ item }) => (
          
          <Card
            from={item.data.from.label}
            where={item.data.where.label}
            seats={item.data.seats}
            date= {item.data.date.seconds}
            total={item.data.totalEx}  
            
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

export default Route;

