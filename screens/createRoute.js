import { StatusBar } from "expo-status-bar";
import React,{useContext} from "react";
import Formik from 'formik';
import * as Yup from 'yup';
import AppButton from '../components/AppButton';
import AppTextInput  from '../components/AppTextInput'; 
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import SubmitButton from '../components/forms/SubmitButton';
import AuthContext from '../config/context';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  CheckBox
 
  
} from "react-native";

 export default function createRoute({navigation}) {
    const authContext = useContext(AuthContext) 
    const handleSubmit = async (values)=>{
      const owener = authContext.userDetails.docId
      values.owener= owener
      console.log(values)
      firebase.firestore().collection('route').add(values)
    }
  
  return (
    <View style={styles.container}>
      
        
       
        <View  style={{marginTop:70}}>
        <AppForm
        initialValues={{from:"" , where:"", date:"", vehicletype:"", vehicleNo:"", seats:"", totalEx:"" }}
        onSubmit={(values)=>handleSubmit(values)}
        >

          <AppFormField 
          style={styles.input}
          name='from'
           placeholder="From" 
           icon='map-marker' />
          <AppFormField style={styles.input} placeholder="where" name='where' icon='map-marker' />
          <AppFormField style={styles.signup}  name='date' placeholder="Date dd/mm/yyyy"/>
          <AppFormField style={styles.signup}  name='vehicletype' placeholder="Vehicle Type"/>
          <AppFormField style={styles.signup} name='vehicleNo' placeholder="Vehicle Number"/>
          <AppFormField style={styles.signup}  name='seats' placeholder="Available Seats" />
          <AppFormField style={styles.signup} name='totalEx' placeholder="Total Expenses"/>
      <SubmitButton style={styles.btnapp} title='Confirm' onPress={()=> navigation.navigate('DriverDashboard')}/>
        </AppForm>
        </View>

      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  checkbox:{
    flexDirection:'row',
    

  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  texting: {
    marginTop: 0,
    alignItems: "center",
    color: "#fff",
    fontSize: 24,
  },
  

  btnapp: {
   
    color: "#fff",
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 58,
    paddingRight: 58,
    borderRadius: 24,
    marginTop: 34,
    fontSize: 24,
  },
  input: {
    
    width:'80%',
    
    
   
   
    


    
  },
  signup:{
    marginTop:-5,
    width:'90%',
  }
  
});
