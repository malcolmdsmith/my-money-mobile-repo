import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import DropShadow from "react-native-drop-shadow";
import colors from "../config/colors";

function AppButton({
  title,
  onPress,
  width,
  color = "primary",
  fontSize = 16,
  icon = "",
  iconAfter = false,
  iconSize = 18,
}) {
  const getButton = (iconAfter, title, icon) => {
    if (iconAfter)
      return (
        <Text>
          {title} <FontAwesome5 name={icon} size={iconSize} />
        </Text>
      );
    else
      return (
        <Text>
          <FontAwesome5 name={icon} size={iconSize} /> {title}
        </Text>
      );
  };

  return (
    <DropShadow style={styles.shadowProp}>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: colors[color] },
          { width: width },
          { zIndex: -1000 },
        ]}
        onPress={onPress}
      >
        {icon != "" ? (
          <Text style={[styles.text, { fontSize: fontSize }]}>
            {getButton(iconAfter, title, icon)}
          </Text>
        ) : (
          <Text style={[styles.text, { fontSize: fontSize }]}>{title}</Text>
        )}
      </TouchableOpacity>
    </DropShadow>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5,
    elevation: -1000,
    zIndex: -1000,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  text: {
    color: colors.white,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
