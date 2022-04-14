import React from "react";
import { View, StyleSheet, Text, Alert } from "react-native";

import Link from "../../../common/Link";

export default BudgetTypeListItem = ({ item, onDelete }) => {
  const createAlert = async (item) => {
    let msg = "";
    msg = "Are you sure you wish to delete " + item.category + "?";

    Alert.alert("Confirm", msg, [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => onDelete(item) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.parent_category}>{item.parent_category}</Text>
      <Link title="" icon="trash-alt" onPress={() => createAlert(item)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 5,
  },
  category: {
    width: 140,
  },
  parent_category: {
    width: 115,
  },
});
