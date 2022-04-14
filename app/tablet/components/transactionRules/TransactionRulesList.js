import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

import TransactionRulesListItem from "./TransactionRulesListItem";
import Shadow from "../../../common/DropShadow";

export default TransactionRulesList = ({ rules, onDelete, onEdit }) => {
  return (
    <>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        <View style={styles.container}>
          {rules.map((chunk, index) => (
            <Shadow key={index}>
              <View style={styles.listContainer}>
                <View style={styles.header}>
                  <Text style={styles.category}>Category</Text>
                  <Text style={styles.search_keytwords}>Search Keywords</Text>
                  <Text style={styles.amount}>Amount</Text>
                </View>
                {chunk.map((rule, subindex) => (
                  <TransactionRulesListItem
                    key={subindex}
                    item={rule}
                    onDelete={onDelete}
                    onEdit={onEdit}
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
  amount: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginLeft: 40,
  },
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
    marginLeft: 32,
  },
  listContainer: {
    borderRadius: 25,
    padding: 15,
    margin: 10,
    backgroundColor: "rgb(235, 235, 235)",
    //backgroundColor: "#fff",
  },
  scroll: {},
  search_keytwords: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
