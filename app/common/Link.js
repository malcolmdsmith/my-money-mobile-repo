import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import colors from "../config/colors";

function AppLink({
  title,
  icon,
  onPress,
  fontSize = 18,
  color = colors.tertiary,
  iconSize = 18,
}) {
  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      <Text style={[styles.text, { fontSize: fontSize }, { color: color }]}>
        <FontAwesome5 name={icon} color={color} size={iconSize} /> {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {},
  text: {
    //color: colors.tertiary,
    //fontSize: isTablet ? 20 : 16,
    fontWeight: "bold",
  },
});

export default AppLink;
