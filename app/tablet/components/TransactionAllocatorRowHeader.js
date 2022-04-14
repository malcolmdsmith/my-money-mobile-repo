import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default TransactionAllocatorRowHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.transDate}>Date</Text>
      <Text style={styles.narrative}>Description</Text>
      <Text style={styles.debit}>Debit</Text>
      <Text style={styles.credit}>Credit</Text>
      <Text style={styles.balance}>Balance</Text>
      <Text style={styles.allocate}>Allocate</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#17246b",
    color: "#fff",
    flexDirection: "row",
    height: 30,
    alignItems: "center",
    zIndex: -100,
    elevation: -100,
  },
  transDate: {
    marginLeft: 35,
    width: 90,
    color: "#fff",
    fontSize: 11,
  },
  narrative: {
    width: 270,
    color: "#fff",
    fontSize: 11,
  },
  debit: {
    width: 80,
    color: "#fff",
    textAlign: "right",
    fontSize: 11,
  },
  credit: {
    width: 70,
    color: "#fff",
    textAlign: "right",
    fontSize: 11,
  },
  balance: {
    width: 80,
    color: "#fff",
    textAlign: "right",
    fontSize: 11,
  },
  allocate: {
    width: 200,
    color: "#fff",
    textAlign: "center",
    fontSize: 11,
  },
});
