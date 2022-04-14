import DropShadow from "react-native-drop-shadow";
import React from "react";
import { StyleSheet } from "react-native";

export default Shadow = ({ children }) => {
  return <DropShadow style={styles.container}>{children}</DropShadow>;
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#171717",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
});
