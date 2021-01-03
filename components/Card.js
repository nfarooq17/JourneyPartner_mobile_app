import React, { useState,useContext } from "react";
import { View, StyleSheet, Image,TouchableWithoutFeedback } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'




import AppText from "./AppText";
import colors from "../config/colors";
import AppButton from "./AppButton";
import { Rating } from "react-native-ratings";
import AuthContext from "../config/context";

function Card({ name ,from,where, seats, date , feedStyle, total,onPress, onPress1,contact, vehicleName,vehicleColor, stars, isApproved , isAccepted}) {
   const authContext =useContext(AuthContext)
  function getDate(time){
    console.log(time)
    let date = new Date(time*1000)

    return date.toLocaleDateString() 
}
  
  return (
    <View style={[styles.card, feedStyle]}>
      <View style={styles.detailsContainer}>
       <View style={{flexDirection:'row'}}>
         {from &&<AppText style={styles.title}>From: {from}</AppText>}
         {isApproved && <AppText style={{marginLeft:150 , fontWeight:'bold', color:colors.green }} >Verified </AppText>}
         </View> 
        <AppText style={styles.title}>to</AppText>
        {where && <AppText style={styles.title}>Where: {where}</AppText>}
       {seats && <AppText style={styles.title}>Available Seats: {seats}</AppText>}
        {date && <AppText style={styles.title} >Departure date: {getDate(date)}</AppText>}
       {total && <AppText style={styles.title}>Total Expenses: { total}</AppText>}
        {vehicleColor && <AppText style={styles.title}>Vehicle Color: {vehicleColor}</AppText>}
       
        {vehicleName && <AppText style={styles.title}>Vehicle Name: {vehicleName}</AppText>}
       {name &&  <AppText style={styles.title}>{name}</AppText>}
        {contact && <AppText style={styles.title}>{contact}</AppText>}
       {stars && <Rating
            startingValue = {stars}
            fractions = {1}
            imageSize ={20}
            readonly ={true}
            
            />}

<View style={{flexDirection:'row'}}>

       {onPress1 && <AppButton title='Book' onPress={onPress1}/>}
       {onPress && <AppButton  title='Maessage' onPress={onPress}/>}
       <AppButton  title='Start' onPress={onPress}/>

</View>

        
       
        
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    overflow: "hidden",
    aspectRatio: 1,
    alignSelf: "center",
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default Card;
