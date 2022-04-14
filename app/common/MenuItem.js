import React, { Component, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../config/colors";

export default MenuItem = ({ item, onSelect }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onSelect(item.route)}
    >
      <Text style={styles.text}>{item.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    elevation: 1000,
    zIndex: 1000,
    borderBottomColor: colors.medium,
    borderBottomWidth: 2,
  },
  text: {
    color: colors.tertiary,
    elevation: 1000,
    zIndex: 1000,
  },
});
