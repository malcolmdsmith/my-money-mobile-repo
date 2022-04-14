import React, { Component, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../../config/colors";

export default SummaryCard = ({ data, totalField }) => {
  const showNil = () => {
    if (data !== undefined) return data.length === 0;

    return true;
  };

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        {showNil() ? <Text>Nil.</Text> : null}
        {data.map((rowData, i) => (
          <View
            key={i}
            style={i % 2 ? styles.rowContainerAlt : styles.rowContainer}
          >
            <Text style={styles.rowCategory}>{rowData.category}</Text>
            <Text style={styles.rowTotal}>{rowData[totalField]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  rowContainer: {
    flexDirection: "row",
  },
  rowContainerAlt: {
    flexDirection: "row",
    backgroundColor: colors.light,
  },
  rowCategory: {
    width: 120,
  },
  rowTotal: {
    width: 80,
    textAlign: "right",
    marginRight: 15,
  },
});
