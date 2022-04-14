import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

export default Heading = ({ title }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/logoball-small.png")}
      />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  image: {
    width: 40,
    height: 40,
  },
  text: {
    fontSize: 26,
    fontStyle: "italic",
    fontWeight: "bold",
    marginLeft: 20,
  },
});
