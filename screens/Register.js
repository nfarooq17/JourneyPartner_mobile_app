import React, { useState,useContext } from "react";
import { StyleSheet, Switch, ImageBackground, View, Alert,KeyboardAvoidingView,ScrollView } from "react-native";
import * as Yup from "yup";
import * as firebase from "firebase"
import 'firebase/firestore';
import colors from '../config/colors';
import Storage from '../config/storage'
import AuthContext from "../config/context";

import Screen from "../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../components/forms";
import AppText from '../components/AppText';
import FormImagePicker from '../components/forms/FormImagePicker';
import storage from "../config/storage";
import { yupToFormErrors } from "formik";








const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  contact: Yup.string().required().max(11, "Please Enter a valid Phone Number").min(11,"Please Enter a valid Phone Number").label("Contact"),
  cnic:Yup.string().required().min(13).max(13).label("CNIC"),
  LicenseNo: Yup.string().required().min(9).max(9),
  images: Yup.array().max(1)

});

function Register({navigation}) {
  
  const [imageUri,setImageUri]=useState()
  const [isEnabled, setIsEnabled] = useState(false)
  
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  async function uploadImageAsync(uri, values) {
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
      .ref().child("profileImage"+ await firebase.auth().currentUser.uid)
  
    const snapshot = await ref.put(blob);
  
    // We're done with the blob, close and release it
    blob.close();
    let imageref= await snapshot.ref.getDownloadURL();
    console.log(imageref)
    let databasevalues = {...values, images: imageref, time: firebase.firestore.FieldValue.serverTimestamp()}

    return await snapshot.ref.getDownloadURL();
  }


  
  
  const handleSubmit = async (values) => {
    
    await firebase.auth().createUserWithEmailAndPassword(values.email, values.password).catch(error => Alert.alert(error.message,"",[
      {text: 'Okay'},
  ]))
  let user = firebase.auth().currentUser
  user.sendEmailVerification().then(function() {
    alert("Email Sent")
  }).catch(function(error) {
    alert(error.message)
  });
    values.uid = firebase.auth().currentUser.uid
    values.isDriver = isEnabled
    values.isApproved= false
    
    console.log(values)
    navigation.goBack();
    const image = await uploadImageAsync(values.image[0], values)
    console.log("hogya")
    values.image = image
    const userRef =firebase.firestore().collection("user")
    const snapshot = await userRef.where('email', '==', values.email ).get()
    if (snapshot.empty) {
      firebase.firestore().collection('user').add(values)
      storage.storeBoard(false)
    
    }
    else {
      console.log("Already Registered")
      
    }  
  }



  return (
   <ScrollView>
    <Screen style={styles.container}>
          <KeyboardAvoidingView>
        <View style={styles.input}>



        
      <Form
        initialValues={{ name: "", email: "", password: "", VehicleNo: "", contact: "", cnic:"" , image:[], LicenseNo:""}}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
        >
          <View style={styles.pic}>

          <FormImagePicker name='image'/>
          </View>
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
          />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
          />
        <FormField
        keyboardType="number-pad"
        icon="id-card"
        name="cnic"
        placeholder="CNIC"
        />
        
        <FormField
          autoCorrect={false}
          icon="phone"
          keyboardType="number-pad"
          name="contact"
          placeholder="Mobile Number"
          />
        
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
          />
        {isEnabled && <FormField
          autoCorrect={false}
          icon="car"
          name="VehicleNo"
          placeholder="Vehicle No"
          /> } 
        {isEnabled && <FormField
          autoCorrect={false}
          
          icon="license"
          name="LicenseNo"
          placeholder="License No"
        /> }
        <View style ={{flexDirection: "row", alignSelf: 'flex-end', alignItems: "center", marginVertical: 10}}>
          <AppText style = {{color: colors.dark, fontWeight: 'bold'}}>Register As A Driver</AppText>
            <Switch
            style={{marginHorizontal: 10}}
            trackColor={{ false: colors.light, true: colors.yellow }}
            thumbColor={isEnabled ? 'yellow' : '#f4f3f4'}
            //ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            />
        </View>

        <View style={{right:-180}}>
        <SubmitButton title="Register" />
          </View> 
      </Form>
            </View>
            </KeyboardAvoidingView>
    </Screen>
   </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    marginTop: 10,
    
   
  },
  pic:{
    marginLeft:100
  },
 
});


export default Register;
