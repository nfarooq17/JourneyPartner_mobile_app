import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View ,ImageBackground, Image} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppButton from '../components/AppButton';

import Login from './login';
import Register from './Register';


 function Home({navigation}) {
  return (
    
    

    
    <View style={styles.container}>
      <Image 
      style={styles.img}
      source={require('../assets/logo.png')}
      />
      <Text style={styles.texting}>JOURNEY PARTNER</Text>
      <AppButton style= {{marginTop:100}} title="Login"  onPress={()=> navigation.navigate("login")}/>
      <Text style={styles.texting2}>OR</Text>

      <AppButton title="Sign Up" 
      onPress={() =>
        navigation.navigate('Register',{name:'Register'})
      }
      />
      <StatusBar style="auto" />
    </View>
    
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: "center",
  },
  texting: {
    marginTop: 10,
    color: "black",
    fontSize: 34,
  },

  texting2: {
    marginTop: 20,
    color: "black",
    fontSize: 24,
  },
  img: {
    marginTop: 100,
    alignSelf: "center",
    width:190,
    height:170,
    marginBottom:20,
  },
  
});

export default Home