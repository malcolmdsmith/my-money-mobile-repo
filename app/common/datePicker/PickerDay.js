import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../config/colors";

export default PickerDay = ({ item, onDaySelected }) => {
  return (
    <TouchableOpacity
      // style={styles.container}
      style={
        item.selected ? [styles.container, styles.selected] : styles.container
      }
      onPress={() => onDaySelected(item)}
    >
      <Text style={item.selected ? [styles.selected] : styles.text}>
        {item.day}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  selected: {
    backgroundColor: colors.tertiary,
    color: colors.white,
    fontWeight: "bold",
    borderRadius: 8,
  },
  text: {
    color: colors.black,
  },
});
