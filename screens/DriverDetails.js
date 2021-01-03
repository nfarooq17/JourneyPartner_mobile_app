import React, { useContext, useEffect, useState } from "react";
import {FlatList, Alert, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity ,Button, View, Image, StyleSheet, Modal, LogBox , ScrollView, KeyboardAvoidingView, KeyboardAvoidingViewBase} from "react-native";
import AppText from "../components/AppText";
import Screen from '../components/Screen'
import * as Yup from "yup";
import * as firebase from "firebase"
import 'firebase/firestore';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import indTexting from './indTexting'



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
import AppPostedReviews from "../components/AppPostedReviews"

import AuthContext from "../config/context";
import Card from "../components/Card";
import { NavigationContainer } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";


const validationSchema = Yup.object().shape({
  description: Yup.string().label("Description"),
});





async function sendPushNotification(nToken, title ) {
  const message = {
    to: nToken,
    sound: 'default',
    title: title,
    body: 'Click to Check Rides',
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



function DriverDetails({route, navigation}) {
  const authContext = useContext(AuthContext)
  const listing = route.params
  
  const [currUser,setCurrUser] = useState(null)
 
  const [reviewModal, setReviewModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [bookAlet , setBookAlert] = useState(false)
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [rate, setRate] = useState(2.5);
  const [messages, setMessages] = useState();
  const [rAvg,setRAvg]=useState(0)
  let avg = 0

 

  async function loadReviewData() {

      console.log("hello")
      console.log(listing.data.owener)
    const postRef = await firebase.firestore().collection("reviews").where("owener","==",listing.data.owener).get()
    setReviewData(postRef.docs.map((doc)=>({id: doc.id, data: doc.data()})))
    const userRef = await firebase.firestore().collection('user').doc(listing.data.owener).get();
    setCurrUser({id: userRef.id, data: userRef.data()})
    setRAvg(0)
    if(postRef.size){
    let t= 0
    let n = 0
    postRef.forEach(doc => {
      t=t+doc.data().rating
      n=n+1
    })
    avg = t/n
    setRAvg(avg)
  }
    
  }
  async function loadRideData() {

    const postRef = await firebase.firestore().collection("route").doc(listing.id).get()
    setMessages([{id: postRef.id, data: postRef.data()}])
    
  }

  const handleReviewSubmit = async(values, rating) =>{
    let databaseadding = {...values, rating: rating, time: firebase.firestore.FieldValue.serverTimestamp(), owener: listing.data.owener, reviewer: authContext.userDetails.name}
    await firebase.firestore().collection('reviews').add(databaseadding)
    const postRef = await firebase.firestore().collection("reviews").where("owener","==",listing.data.owener).get()
    setRAvg(0)
    if(postRef.size){
    let t= 0
    let n = 0
    postRef.forEach(doc => {
      t=t+doc.data().rating
      n=n+1
    })
    t=t+rating
    n=n+1
    avg = t/n
    setRAvg(avg)
    console.log(avg)
    firebase.firestore().collection('user').doc(listing.data.owener).update({avg: avg})
  }

    

  
  }

  const bookRide= async (item)=>{
    setBookAlert(true)
    const pId = authContext.userDetails.docId
    const name = authContext.userDetails.name
    const dName = currUser.data.name
    item.data.dName= dName
    item.data.name = name
    item.data.isAccepted=false
    item.data.pId = pId
    firebase.firestore().collection('ride').add(item.data)
    console.log(item.data);
    console.log("pid",pId);
    console.log("token",authContext.userDetails);
    const user = await firebase.firestore().collection('user').doc(item.data.owener).get()
    const token = user.data().nToken
    sendPushNotification(token, authContext.userDetails.name + " is Requesting a Ride")
    
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
     
   
        <View style={styles.userContainer, {marginLeft: 1}}>
          <ListItem 
            image={currUser.data.image}
            title={currUser.data.name}
            contact={currUser.data.contact}
            vehicleNo={currUser.data.VehicleNo}
            stars = {currUser.data.avg}
            
            
           
            
          ></ListItem>
        </View></>}
    </View > 
     <View style = {{alignItems: "center"}}>
       <View style = {{flexDirection: 'row', }}>
        <TouchableOpacity style={{backgroundColor: colors.green, borderRadius: 500, padding: 5 ,marginTop:20 }} onPress = {() =>{loadReviewData(); setReviewModal(true)}}>
                    <AppText style={{color: colors.yellow}}>   Reviews   </AppText>
        </TouchableOpacity>
        </View>


        <Modal visible={reviewModal} animationType="slide">
          <Screen>
           <Button style={{backgroundColor:colors.green , color:colors.yellow}}  title="Close" onPress={() => (setReviewModal(false))} />
           {authContext.userDetails.isDriver === false && <View style = {{alignItems: "center", padding: 5}}>
           <TouchableOpacity style={{backgroundColor: colors.green, borderRadius: 500, padding: 15, alignItems: "center"}} onPress = {() => {setModalVisible(true); setReviewModal(false)}}>
                    <AppText style={{color: colors.yellow, fontWeight: "bold"}}>Give your Own Review</AppText>
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
          <ScrollView>
            <KeyboardAvoidingView>
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
        name="description"
        placeholder="Description"
        />
     <SubmitButton title="Post" />
    </Form>
    </View>
        </KeyboardAvoidingView>
        </ScrollView>
        </Screen>
        </Modal>
        <Modal 
        transparent={true}
        visible={bookAlet}>
          <View style={{flexDirection:'row',marginTop:300 , backgroundColor:colors.yellow, height:100 , width:'80%', alignSelf:'center', borderRadius:25}}>
            <AppText style={{color:colors.green , fontSize:20, marginTop:35, marginLeft:45}}>Request Has Been Sent</AppText>
            <TouchableOpacity onPress={()=>{setBookAlert(false)}}><MaterialCommunityIcons style={{marginLeft:65,}} size={30} color={colors.green}  name='close-circle-outline'/></TouchableOpacity>
          </View>
        </Modal>
      </View> 
      <Screen>
    
      <FlatList
      data={messages}
      keyExtractor={(message) => message.id.toString()}
      renderItem={({ item }) => (
          
        <Card
       
        from={item.data.from.label}
        where={item.data.where.label}
        seats={item.data.seats}
        date= {item.data.date.seconds}
        total={item.data.totalEx}
        stars = {item.data.avg}ecard
        vehicleColor={item.data.vehicleColor}
        vehicleName={item.data.vehicleName}
        onPress1= {()=> bookRide(item)}
        onPress={()=>navigation.navigate('indTexting', {screen: 'indTexting', params: {id: item.data.owener}})}
        />
        )}
          
      ItemSeparatorComponent={ListItemSeparator}
    />
  
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
