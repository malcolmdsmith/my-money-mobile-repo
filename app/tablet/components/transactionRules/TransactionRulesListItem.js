import React from "react";
import { View, StyleSheet, Text, Alert } from "react-native";

import Link from "../../../common/Link";

export default TransactionRulesListItem = ({ item, onDelete, onEdit }) => {
  const createAlert = async (item) => {
    let msg = "";
    msg =
      "Are you sure you wish to delete " +
      item.category +
      ": " +
      item.search_keywords +
      "?";

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
      <Link title="" icon="pencil-alt" onPress={() => onEdit(item)} />
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.search_keywords}>{item.search_keywords}</Text>
      <Text style={styles.amount}>{item.amount}</Text>
      <Link title="" icon="trash-alt" onPress={() => createAlert(item)} />
    </View>
  );
};

const styles = StyleSheet.create({
  amount: {
    width: 50,
    textAlign: "center",
  },
  container: {
    flexDirection: "row",
    marginBottom: 8,
  },
  category: {
    marginLeft: 5,
    width: 140,
  },
  search_keywords: {
    width: 200,
  },
});
