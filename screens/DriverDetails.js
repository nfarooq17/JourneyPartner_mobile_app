import React, { useContext, useEffect, useState } from "react";
import {FlatList, Alert, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity ,Button, View, Image, StyleSheet, Modal, LogBox } from "react-native";
import AppText from "../components/AppText";
import Screen from '../components/Screen'
import * as Yup from "yup";
import * as firebase from "firebase"
import 'firebase/firestore';


import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";

import {ListItem, ListItemSeparator, ListItemDeleteAction} from "../components/lists";
import colors from "../config/colors";
import AppReview from "../components/AppReview";
import AppButton from "../components/AppButton";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AppPostedReviews from "../components/AppPostedReviews";
import CheckOutSwipes from "../components/CheckOutSwipes";
import AuthContext from "../config/context";
import Card from "../components/Card";


const validationSchema = Yup.object().shape({
  description: Yup.string().label("Description"),
});


const handleReviewSubmit = (values, rating) =>{
  firebase.firestore().collection('reviews').add(values)

}

let totalBill = 0
let order = []



function DriverDetails({route}) {
  const authContext = useContext(AuthContext)
  const listing = route.params
  
  const [currUser,setCurrUser] = useState(null)
 
  const [reviewModal, setReviewModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [rate, setRate] = useState(2.5);
  const [messages, setMessages] = useState();


 

  async function loadReviewData() {

      console.log("hello")
      console.log(listing.data.owener)
    const postRef = await firebase.firestore().collection("reviews").where("owener","==",listing.data.owener).get()
    setReviewData(postRef.docs.map((doc)=>({id: doc.id, data: doc.data()})))
    const userRef = await firebase.firestore().collection('user').doc(listing.data.owener).get();
    setCurrUser({id: userRef.id, data: userRef.data()})
    
  }
  async function loadRideData() {

    const postRef = await firebase.firestore().collection("route").doc(listing.id).get()
    setMessages([{id: postRef.id, data: postRef.data()}])
    
  }

  const handleReviewSubmit = (values, rating) =>{
    let databaseadding = {...values, rating: rating, time: firebase.firestore.FieldValue.serverTimestamp(), owener: listing.data.owener, reviewer: authContext.userDetails.name}
    firebase.firestore().collection('reviews').add(databaseadding)
  
  }

  const bookRide=(item)=>{
    const pId = authContext.userDetails.docId
    const name = authContext.userDetails.name
    item.data.name = name
    item.data.isAccepted=false
    item.data.pId = pId
    firebase.firestore().collection('ride').add(item.data)
    console.log(item.data);
    console.log("pid",pId);
  }



  const [reviewData,setReviewData] = useState()
  useEffect(()=> {
      loadRideData();
      loadReviewData();

  },[])

  
 
  

  


  
  

  return (
    <>
     <View>
     {currUser!==null&&
     <>
     <Image  style={styles.image} source={{uri: currUser.data.image}} />
   
        <View style={styles.userContainer, {marginLeft: 1}}>
          <ListItem 
            image={currUser.data.image}
            title={currUser.data.name}
            badge={false}
          ></ListItem>
        </View></>}
    </View > 
     <View style = {{alignItems: "center"}}>
       <View style = {{flexDirection: 'row', }}>
        <TouchableOpacity style={{backgroundColor: colors.black, borderRadius: 500, padding: 5}} onPress = {() =>{loadReviewData(); setReviewModal(true)}}>
                    <AppText style={{color: colors.white}}>   Reviews   </AppText>
        </TouchableOpacity>
        </View>


        <Modal visible={reviewModal} animationType="slide">
          <Screen>
           <Button  title="Close" onPress={() => (setReviewModal(false))} />
           {authContext.userDetails.isDriver === false && <View style = {{alignItems: "center", padding: 5}}>
           <TouchableOpacity style={{backgroundColor: colors.primary, borderRadius: 500, padding: 15, alignItems: "center"}} onPress = {() => {setModalVisible(true); setReviewModal(false)}}>
                    <AppText style={{color: colors.white, fontWeight: "bold"}}>Give your Own Review</AppText>
           </TouchableOpacity>
           </View>}
           <FlatList
            data={reviewData}
            keyExtractor={(dataa) => dataa.id.toString()}
            renderItem={({ item }) => (
              <AppPostedReviews
              username = {item.data.reviewer}
              time = {item.data.time.seconds}
              description={item.data.description}
              stars={item.data.rating}
               />
            )}
          />
          </Screen>
        </Modal>
        <Modal visible={modalVisible} animationType="fade" >
        <Screen>
        <AppButton title="Close" onPress={() => (setModalVisible(false), setRate(2.5))} /> 
          <View style ={{marginTop: 50}}> 
          <AppReview ratingCompleted = {(rating) =>setRate(rating)}></AppReview>
          <Form
        initialValues={{
          description: "",
        }}
        onSubmit={(values) => (handleReviewSubmit(values, rate))}
        validationSchema={validationSchema}
      ><FormField
      maxLength={255}
      multiline
      name="description"
      numberOfLines={5}
      placeholder="Description"
    />
     <SubmitButton title="Post" />
    </Form>
    </View>
        </Screen>
        </Modal>
      </View> 
      <Screen>
    
      <FlatList
      data={messages}
      keyExtractor={(message) => message.id.toString()}
      renderItem={({ item }) => (
          
        <Card
          from={item.data.from}
          where={item.data.where}
          seats={item.data.seats}
          date= {item.data.date}
          total={item.data.totalEx}
          onPress= {()=> bookRide(item)}
        />
        )}
          
      ItemSeparatorComponent={ListItemSeparator}
    />
   <Modal visible={checkOutmodalVisible} animationType="slide">
      <Screen>
      <FlatList
      data={order}
      keyExtractor={(order) => order.id.toString()}
      renderItem={({ item }) => (
        <ListItem
          title={item.data.title}
          subTitle = {("Price of One is Rs."+item.data.price+" You currently have "+item.data.count+" in cart").toString()}
        />
      )}
      ItemSeparatorComponent={ListItemSeparator}
      >  
      </FlatList>
       
      </Screen>
    </Modal>
    </Screen>
    </>
    
  );
}

const styles = StyleSheet.create({
  settingFlex: {
    alignSelf: "center",
    flexDirection: "column",
    paddingTop: 1
  },
  detailsContainer: {
    padding: 5,
    paddingLeft: 20
  },
  image: {
    width: "100%",
    height: 200,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 10,
  },
  style: {
    width: 10
  },
  totalStyle: {
    flexDirection: "row-reverse",
    padding: 20,
    justifyContent:"center",
    backgroundColor: colors.primary
  }
});

export default DriverDetails;
