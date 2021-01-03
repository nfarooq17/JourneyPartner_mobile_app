import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import * as firebase from "firebase"
import 'firebase/firestore';

import Screen from "../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import AuthContext from "../config/context";

const initialMessages = [
  {
    id: 1,
    title: "Nashit",
    description: "hey",
    image: 'https://picsum.photos/200/300'
  },
  {
    id: 2,
    title: "Abdullah",
    description: "Hello bro",
    image: 'https://picsum.photos/200/300'
  },
];

function Texting({navigation}) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);
  const [listings , setListings ] = useState();
  const [Loading , isLoading] = useState();
  const authContext = useContext(AuthContext)
  async function loaddata() {
    setListings(null)
    isLoading(true)
    const postRef = await firebase.firestore().collection("user").where('uid',"!=",authContext.userDetails.uid).get()
    setListings(postRef.docs.map((doc)=>({id: doc.id, data: doc.data()})))
    let data =[]

       isLoading(false)
   
  }
  useEffect(()=> {
    loaddata();
    
  },[])


  const handleDelete = (message) => {
    // Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        data={listings}
        keyExtractor={(listings) => listings.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.data.name}
            subTitle={item.data.email}
            chevron
            image={item.image}
            onPress={() => navigation.navigate('indTexting',item)}  
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => navigation.navigate('indTexting',item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        // onRefresh={() => {
        //   setMessages([
        //     {
        //       id: 2,
        //       title: "T2",
        //       description: "D2",
        //       image: require("../assets/mosh.jpg"),
        //     },
        //   ]);
        // }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default Texting;
