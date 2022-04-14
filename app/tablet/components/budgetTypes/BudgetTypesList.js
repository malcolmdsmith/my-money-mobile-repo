import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

import BudgetTypeListItem from "./BudgetTypeListItem";
import Shadow from "../../../common/DropShadow";

export default BudgetTypesList = ({ types, onDelete }) => {
  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
        <View style={styles.container}>
          {types.map((chunk, index) => (
            <Shadow key={index}>
              <View style={styles.listContainer}>
                <View style={styles.header}>
                  <Text style={styles.category}>Category</Text>
                  <Text style={styles.parent}>Parent</Text>
                </View>
                {chunk.map((type, subindex) => (
                  <BudgetTypeListItem
                    key={subindex}
                    item={type}
                    onDelete={onDelete}
                  />
                ))}
              </View>
            </Shadow>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  category: {
    width: 140,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  container: {
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
  },
  listContainer: {
    borderRadius: 25,
    padding: 15,
    margin: 10,
    backgroundColor: "rgb(235, 235, 235)",
    //backgroundColor: "#fff",
  },
  parent: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
