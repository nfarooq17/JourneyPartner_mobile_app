import { StatusBar } from "expo-status-bar";
import React,{useContext, useState} from "react";
import Formik from 'formik';
import * as Yup from 'yup';
import AppButton from '../components/AppButton';
import AppTextInput  from '../components/AppTextInput'; 
import AppForm from '../components/forms/AppForm';
import AppFormPicker from '../components/forms/AppFormPicker';
import AppFormField from '../components/forms/AppFormField';
import SubmitButton from '../components/forms/SubmitButton';
import AuthContext from '../config/context';
import * as firebase from 'firebase';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import 'firebase/firestore';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  CheckBox,
  ScrollView,
  KeyboardAvoidingView
 
  
} from "react-native";
import Calendar from "../components/calender";
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from "../config/colors";

const city = [
  {label:'Lahore', value:1},
  {label:'Islamabad', value:2},
  {label:'Faisalabad', value:3},
  {label:'Okara', value:4},
  {label:'Chishtiyan', value:5}

];
const vehicleType=[
  {label:'SUV' , value:1},
  {label:'VX' , value:2},
  {label:'VXR' , value:3},
  {label:'1.5iVTech' , value:4},
  {label:'1.3iVTech' , value:5}




];
 export default function createRoute({navigation}) {
  const [date, setDate] = useState(new Date(Date.now()));
    const authContext = useContext(AuthContext) 
    const handleSubmit = async (values)=>{
      const owener = authContext.userDetails.docId
      values.isApproved= authContext.userDetails.isApproved
      values.owener= owener
      values.date = date
      console.log(values)
      firebase.firestore().collection('route').add(values)
      alert('Route has been created')
      navigation.goBack();
    }
     const validationSchema = Yup.object().shape({
       from:Yup.string().required('Select the city'),
   
     })
    
  
    const [show, setShow] = useState(false);
    const showMode = () => {
      setShow(true);
    };
    const onChange = (selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      if(currentDate.type === 'dismissed'){
        setShow(false)
        console.log("hello")
        return
      }
      let d = new Date(currentDate.nativeEvent.timestamp).toLocaleDateString()
      setDate(new Date(currentDate.nativeEvent.timestamp));
      console.log(currentDate)
      setShow(false)

    };
  return (
    <ScrollView>

    <View style={styles.container}>
      
        
       
        <View  style={{marginTop:40}}>
          <KeyboardAvoidingView>

        <AppForm
        initialValues={{from:"" , where:"",  vehicleName:"", vehicleColor:"", seats:"", totalEx:"" }}
        onSubmit={(values)=>handleSubmit(values)}
        validationSchema={validationSchema}
        style={styles.AppForm}
        >

          <AppFormPicker 
          items={city}
          name='from'
          style={styles.input}
          placeholder="From" 
          icon='map-marker' />
          <AppFormPicker style={styles.input} 
          items={city}
          placeholder="where" name='where' icon='map-marker' />
          <View style = {{flexDirection: "row"}}>
          <MaterialCommunityIcons
          name="calendar-clock"
          size={20}
          color={colors.medium}
          style={styles.icon}
          onPress={()=> {setShow(true)}}
        />
          <AppTextInput
          placeholder = { new Date(date).toLocaleDateString()}
          editable = {false}
          />
          </View>

           {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
          
          
        />
      )}
          <AppFormField  style={styles.signup}  name='vehicleName' placeholder="Vehicle Name"/>
          <AppFormField style={styles.signup} name='vehicleColor' placeholder="Vehicle colour"/>
          <AppFormField style={styles.signup} keyboardType='number-pad'  name='seats' placeholder="Available Seats" />
          <AppFormField style={styles.signup} keyboardType='number-pad' name='totalEx' placeholder="Total Expenses"/>
          <View style={styles.thisbtn}>
            <SubmitButton title='Confirm' onPress={()=> navigation.navigate('DriverDashboard')}/>
            </View>
          </AppForm>
        </KeyboardAvoidingView>
        </View>
      <StatusBar style="auto" />
    </View>
</ScrollView>
  );
}


const styles = StyleSheet.create({
  checkbox:{
    flexDirection:'row',
    
    
  },
  thisbtn: {
     right:-200,
     paddingBottom: 40
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
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },

  btnapp: {
   
    color: "#fff",
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 58,
    paddingRight: 58,
    borderRadius: 24,
    marginTop: 20,
    fontSize: 24,
  },
  input: {
    
    width:'100%',
  },
  signup:{
    marginTop:-5,

    width:'90%',
  },
  icon: {
    paddingTop: 19,
    position: "absolute",
    right: 30,
    zIndex: 1
  },
  
});
