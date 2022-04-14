import React, { Component, useState } from "react";
import { View, StyleSheet } from "react-native";

import Screen from "../../common/Screen";
import Heading from "../../common/Heading";
import Dashboard from "../components/dashBoard/Dashboard";

export default HomeScreen = ({ navigation }) => {
  return (
    <Screen navigation={navigation}>
      <Heading title="Dashboard" />
      <View style={styles.container}>
        <Dashboard />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});
