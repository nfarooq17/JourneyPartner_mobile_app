import React, { useState } from "react";
import { View, StyleSheet, Image,TouchableWithoutFeedback } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'




import AppText from "./AppText";
import colors from "../config/colors";
import AppButton from "./AppButton";

function Card({ name ,from,where, seats, date , feedStyle, total,onPress,contact }) {
  
  return (
    <View style={[styles.card, feedStyle]}>
      <View style={styles.detailsContainer}>
      
        <AppText style={styles.title}>From: {from}</AppText>
        <AppText style={styles.title}>to</AppText>
        <AppText style={styles.title}>Where: {where}</AppText>
        <AppText style={styles.title}>Available Seats: {seats}</AppText>
        <AppText style={styles.title} >Departure date: {date}</AppText>
        <AppText style={styles.title}>Total Expenses{ total}</AppText>
        <AppText style={styles.title}>{name}</AppText>
        <AppText style={styles.title}>{contact}</AppText>
        <AppButton title='Book' onPress={onPress}/>
        
       
        
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
