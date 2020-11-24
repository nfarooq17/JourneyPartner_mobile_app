import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import AppTextInput from '../components/AppTextInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import * as firebase from "firebase"
import 'firebase/firestore';

import authStorage from '../config/storage'



import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  ImageBackground,
  Modal
} from "react-native";
import AppButton from "../components/AppButton";
import ErrorAlert from '../components/errorAlert';
import Forgotpassword1 from './forgotpassword1';
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "../config/context";
import { AppForm, SubmitButton } from "../components/forms";


export default function login({navigation}) {
  const [open,setOpen] = useState(false)

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4,"Atleast 4 characters").label("Password")

  })

  const authContext = useContext(AuthContext);

  const loginUser = async ({email, password}) => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(error => alert(error))
    const userRef = firebase.firestore().collection("user")
    const snapshot = await userRef.where('email', '==', email ).get()
    
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }
    else {
      let i = 0
      await snapshot.forEach(doc => {
        if(password === doc.data().password){
          let u = doc.data();
          u.docId = doc.id
          console.log(u)
          authContext.setUserDetails(u);
          console.log(authContext.userDetails)
          authStorage.storeToken(JSON.stringify(u))
          console.log("Login Hello")
          
        }
        else{
          console.log("Wrong Password")
        }
      });
      
    } 
    console.log(authContext.userDetails)
    return
  }
  function forgetPassword(values){
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(values).catch(function() {
      consol.log('Email sent.');
    }).catch(function(error) {
      consol.log(error)
    });
  }
      
  return (
    <View style={styles.container}>
      <Image
      style={styles.img}
      source={require("../assets/logo.png")}
      />
      <Formik
      initialValues={ {email:'' , password:''}}
      onSubmit = { (values) => loginUser(values)}
      validationSchema={validationSchema}
      >
         {({handleChange , handleSubmit , errors , setFieldTouched , touched})  =>(
        <>
         <AppTextInput
      autoCapitalize="none"
      name = 'email'
      keyboradType="email-address"
      autoCorrect={false}
      keyboradType="default"
      onBlur = {()=> setFieldTouched("email")}
      placeholder="Phone or Login" icon="email"
      textContentType='emailAddress'
      onChangeText={handleChange('email')}
       />
       <ErrorAlert error={errors.email} visible={touched.email}/>
      <AppTextInput 
      autoCapitalize="none"
      autoCorrect={false}
      name = 'password'

      onBlur={()=> setFieldTouched("password")}
      secureTextEntry={true}
      textContentType="password" 
      placeholder="Password" icon="lock"
      onChangeText={handleChange('password')} />
     <ErrorAlert error={errors.password} visible={touched.password}/>

      <AppButton style={{backgroundColor:'black'}} title="Login" onPress={handleSubmit}/>
     
        </>
      )
    }
     

      </Formik>

      <TouchableOpacity style={{marginTop:10,}} onPress={()=>{setOpen(true)}}
      ><Text
      style={{color:"blue"}}>
        Forgot PAssword?
      </Text>
      </TouchableOpacity>
      <Modal
      visible={open}>
      <View style={styles.container1}>
              <AppForm
              initialValues={{email:''}}
              onSubmit={(values)=>forgetPassword(values)}
                >
            <AppTextInput 
            placeholder='Email'
            name='email'
            autoCapitalize='none'

            />
            <SubmitButton style={styles.btn} title='Confirm' opPress={()=> {setOpen(false)}}/>
            </AppForm>
        </View>
      </Modal>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  img: {
    marginTop: 50,
    alignSelf: "center",
    width:190,
    height:170,
    marginBottom:20,
  },
  container1: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop:20
    
  },
 input1:{
    marginTop:200,

 },
 btn:{
     width:20,
 }


  
});
