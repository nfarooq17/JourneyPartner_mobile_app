import React from 'react';
import { SafeAreaView ,Text,StyleSheet,View} from 'react-native';
import { StatusBar } from "expo-status-bar";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Screen from "../components/Screen";
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import SubmitButton from '../components/forms/SubmitButton';
import AppText from '../components/AppText';
import * as firebase from "firebase"
import 'firebase/firestore';
import colors from '../config/colors';
 import MapScreen from './MapScreen';
 
function PasSearch  () {
  return (
      
    /*<GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = true) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
            key: 'AIzaSyBgbUU4Z80g38wwvRaO7lw-_q0s35A7YgI',
            language: 'en',
        }}
        />*/
        
        <View style={styles.container}>
        <View style={{marginTop:-40, flex:2}} >
      <MapScreen/>
        
          </View>
      
        
       
        <View  style={{marginTop:70 , flex:2, paddingRight:5,paddingLeft:5}}>
        <AppForm
        initialValues={{from:"" , where:""}}
        onSubmit={(values)=>handleSubmit(values)}
        >

          <AppFormField 
          style={styles.input}
          name='from'
           placeholder="From" 
           icon='map-marker' />
          <AppFormField style={styles.input} placeholder="where" name='where' icon='map-marker' />
         
      <SubmitButton style={styles.btnapp} title='Confirm'/>
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

 
export default PasSearch;