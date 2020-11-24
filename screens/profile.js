import React, { useContext } from "react";
import { View, StyleSheet,SafeAreaView,Image } from "react-native";

//import * as Yup from "yup";
//import * as Location from 'expo-location'

import * as firebase from "firebase"
import 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import AuthContext from '../config/context';
import EditProfile from './EditProfile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


/*import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import Screen from "../components/Screen";
//import useLocation from "../hooks/useLocation";
import AuthContext from "../config/context";
import authStorage from '../config/storage'*/




function Profile({navigation}) {
  //const location = useLocation();
  //const [imageUri,setImageUri]=useState()
  const authContext = useContext(AuthContext)
   
  //const [isEnabled, setIsEnabled] = useState(authContext.userDetails.isDriver)

  /*async function uploadImageAsync(uri, values) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    const ref = firebase
      .storage()
      .ref().child("profileImage"+authContext.userDetails.uid)
  
    const snapshot = await ref.put(blob);
  
    // We're done with the blob, close and release it
    blob.close();
    let imageref= await snapshot.ref.getDownloadURL();
    console.log(imageref)
    let databasevalues = {...values, images: imageref, time: firebase.firestore.FieldValue.serverTimestamp()}

    return await snapshot.ref.getDownloadURL();
  }


  const handleSubmit = async (values) => {
    navigation.goBack()
    console.log(values)
    const image = await uploadImageAsync(values.image[0], values)
    values.image = image
    const userRef =firebase.firestore().collection("user")
    const snapshot = await userRef.where('email', '==', values.email ).get()
    if (!snapshot.empty) {
      firebase.firestore().collection('user').doc(authContext.userDetails.docId).update(values).then(storeUser(values.email))
      
    }
    else {
      console.log("Already Registered")
      
    }  
  }

async function storeUser (email) {
  const userRef =firebase.firestore().collection("user")
  const snapshot = await userRef.where('email', '==', email ).get()
  await snapshot.forEach(doc => {
    if(email === doc.data().email){
      let u = doc.data();
      u.docId = doc.id
      console.log(u)
      
      authStorage.storeToken(JSON.stringify(u))
      console.log("Hello")
      authContext.setUserDetails(u);
      console.log(authContext.userDetails)
    }
    else{
      console.log("Error While Saving")
    }
  });
  console.log(authContext.userDetails)
  return
}*/

return (
  <ScrollView style={{marginTop:50}} >
  <SafeAreaView style={styles.container}>

  <View style={styles.userInfoSection}>
    <View style={{flexDirection: 'row', marginTop: 15}}>
      <Image 
        source={{uri:authContext.userDetails.image}}
       style={{width:70 , height:70,borderRadius:35}}
      />
      <View style={{marginLeft: 20}}>
        <Title style={[styles.title, {
          marginTop:15,
          marginBottom: 5,
        }]}>{authContext.userDetails.name}</Title>
        
      </View>
      
      <Icon style={{padding:10}} name="account-edit" color="#777777" size={25}
      onPress={() => {navigation.navigate('EditProfile', {name:'EditProfile'})}}
      />
      
    </View>
    
  </View>

  <View style={styles.userInfoSection}>
    <View style={styles.row}>
      <Icon name="map-marker-radius" color="#777777" size={20}/>
      <Text style={{color:"#777777", marginLeft: 20}}>Lahore, Pakistan</Text>
    </View>
    <View style={styles.row}>
      <Icon name="phone" color="#777777" size={20}/>
      <Text style={{color:"#777777", marginLeft: 20}}>{authContext.userDetails.contact}</Text>
    </View>
    <View style={styles.row}>
      <Icon name="email" color="#777777" size={20}/>
      <Text style={{color:"#777777", marginLeft: 20}}>{authContext.userDetails.email}</Text>
    </View>
    {authContext.userDetails.isDriver && <View style={styles.row}>
      <Icon name="car" color="#777777" size={20}/>
      <Text style={{color:"#777777", marginLeft: 20}}>vehicle</Text>
    </View>}
  </View>


  <View style={styles.menuWrapper}>
    
    
    <TouchableRipple onPress={() => {}}>
      <View style={styles.menuItem}>
        <Icon name="logout" color="#FFD300" size={25}/>
        <Text style={styles.menuItemText}>Edit Profile</Text>
      </View>
    </TouchableRipple>
    
    <TouchableRipple onPress={() => {}}>
      <View style={styles.menuItem}>
        <Icon name="logout" color="#FFD300" size={25}/>
        <Text style={styles.menuItemText}>Logout</Text>
      </View>
    </TouchableRipple>
  </View>
</SafeAreaView>
  
  
  </ScrollView>
);
};


const styles = StyleSheet.create({
container: {
  flex: 1,
},
userInfoSection: {
  paddingHorizontal: 30,
  marginBottom: 25,
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
},
caption: {
  fontSize: 14,
  lineHeight: 14,
  fontWeight: '500',
},
row: {
  flexDirection: 'row',
  marginBottom: 10,
  
},
infoBoxWrapper: {
  borderBottomColor: '#dddddd',
  borderBottomWidth: 1,
  borderTopColor: '#dddddd',
  borderTopWidth: 1,
  flexDirection: 'row',
  height: 100,
},
infoBox: {
  width: '50%',
  alignItems: 'center',
  justifyContent: 'center',
},
menuWrapper: {
  marginTop: 10,
},
menuItem: {
  flexDirection: 'row',
  paddingVertical: 15,
  paddingHorizontal: 30,
},
menuItemText: {
  color: '#777777',
  marginLeft: 20,
  fontWeight: '600',
  fontSize: 16,
  lineHeight: 26,
},
});

export default Profile ;
