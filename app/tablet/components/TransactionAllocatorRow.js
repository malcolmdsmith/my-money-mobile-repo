import React, { Component, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

import Picker from "../../common/Picker";
import { formatDate } from "../../utility/dateFunctions";
import { zeroToEmpty } from "../../utility/formatting";
import Button from "../../common/Button";

export default TransactionAllocatorRow = ({
  transaction,
  rowIndex,
  categories,
  onSelectItem,
  onOpenAddCategory,
  onOpenAddRule,
}) => {
  const handleSelectItem = (item) => {
    console.info("item...", item);
    onSelectItem(item, transaction);
  };

  return (
    <View
      style={rowIndex % 2 === 0 ? styles.evenContainer : styles.oddContainer}
    >
      <Text style={styles.cntr}>{rowIndex + 1}</Text>
      <Text style={styles.transDate}>{formatDate(transaction.transDate)}</Text>
      <Text style={styles.narrative}>{transaction.narrative}</Text>
      <Text style={styles.debitAmount}>
        {zeroToEmpty(transaction.debitAmount)}
      </Text>
      <Text style={styles.creditAmount}>
        {zeroToEmpty(transaction.creditAmount)}
      </Text>
      <Text style={styles.balance}>{transaction.balance}</Text>
      <Picker
        items={categories}
        selectedItem={transaction.myBudgetCategory}
        width={200}
        onSelectItem={handleSelectItem}
        placeholder=""
        numberOfColumns={4}
      />
      <View style={styles.buttons}>
        <Button
          title="Add Category"
          fontSize={11}
          color="secondary"
          onPress={() => onOpenAddCategory(transaction)}
        />
        <Button
          title="Add Rule"
          fontSize={11}
          color="greenDark"
          onPress={() => onOpenAddRule(transaction)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "column",
  },
  evenContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(221,208,208)",
    zIndex: -100,
    elevation: -100,
  },
  oddContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(231, 228, 228)",
    zIndex: -100,
    elevation: -100,
  },
  cntr: {
    width: 25,
    fontSize: 11,
    textAlign: "center",
  },
  transDate: {
    marginLeft: 10,
    width: 80,
    fontSize: 11,
  },
  narrative: {
    marginLeft: 10,
    width: 280,
    fontSize: 11,
  },
  debitAmount: {
    marginLeft: 10,
    marginRight: 10,
    width: 60,
    textAlign: "right",
    fontSize: 11,
  },
  creditAmount: {
    marginRight: 10,
    width: 60,
    textAlign: "right",
    fontSize: 11,
  },
  balance: {
    width: 70,
    marginRight: 10,
    fontSize: 11,
    textAlign: "right",
  },
});
