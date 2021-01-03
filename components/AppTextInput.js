import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

function AppTextInput({ icon, ...otherProps }) {
  return (
    <View style={styles.container} >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={defaultStyles.text}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    flexDirection: "row",
    width: "90%",
    paddingTop: 13,
    paddingRight: 10,
    paddingLeft:10,
    marginHorizontal: 20,
    
    marginVertical: 5,
    borderColor:'#666',
    borderWidth:1,
    borderRadius: 15,
    shadowColor: '#666',
    paddingBottom:10
  },
  icon: {
    paddingTop:3,
    paddingLeft: 0,
  },
});

export default AppTextInput;
