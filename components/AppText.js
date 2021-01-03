import React from "react";
import { Text,View } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'

import defaultStyles from "../config/styles";

function AppText({ children, style,icon, ...otherProps }) {
  return <Text style={[defaultStyles.text, style]}  {...otherProps}>{children}</Text>
  
  // <View style= {{
  //   flexDirection: "row",
  // }}>


    

{/* {icon && 
<MaterialCommunityIcons
name={icon}
size={20}
color="dodgerblue"


/>}   */}
// </View>
  
    
}

export default AppText;
