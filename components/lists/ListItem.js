import React, { useContext } from "react";
import { Rating } from "react-native-ratings";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import AppText from "../AppText";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {MaterialCommunityIcons} from "@expo/vector-icons"

import colors from "../../config/colors";

import AuthContext from "../../config/context";


function ListItem({
  title,
  title1,
  subTitle,
  subTitle1,
  subTitle2,
  contact,
  vehicleNo,
  image,
  IconComponent,
  onPress,
  style,
  imageStyle,
  chevron,
  settingIcon,
  onSettingPress,
  stars,
  isAccepted
}) {
  const authContext = useContext(AuthContext)
  return (
   
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={[styles.container, style]}>
          {IconComponent}
          {image && <Image style={[styles.image,imageStyle]}source= {{uri: image}} />}
          <View style={[styles.detailsContainer]}>
           {/* {isAccepted && <AppText style={{marginLeft:250}}>Status: Accepted</AppText>}
           {isAccepted &&  {!isAccepted &&<AppText style={{marginLeft:250}}>Status: Pending</AppText>}} */}
           {!authContext.userDetails.isDriver&& <AppText style={styles.title} numberOfLines ={1}>{title}</AppText>}
            {authContext.userDetails.isDriver &&<AppText style={styles.title} numberOfLines ={1}>{title1}</AppText>}
            {contact&&<AppText style={styles.title} numberOfLines ={1}>Contact: {contact}</AppText>}
            {vehicleNo&&<AppText style={styles.title} numberOfLines ={1}>Vehicle No: {vehicleNo}</AppText>}
           
            {subTitle && <AppText style={styles.subTitle} numberOfLines ={2}>{subTitle}</AppText>}
            {subTitle1&& <AppText style={styles.subTitle} numberOfLines ={2}>{subTitle1}</AppText>}
           {subTitle2&& <AppText style={styles.subTitle} numberOfLines ={2}>{subTitle2}</AppText>}
            {stars && <AppText>

            <Rating
            startingValue = {stars}
            fractions = {1}
            imageSize ={20}
            readonly ={true}
            /> {Math.round((stars + Number.EPSILON) * 100) / 100}
            </AppText> } 



          </View>  
        </View>
      </TouchableHighlight>
    
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItem;
