import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal, Alert, ScrollView, Text } from "react-native";
import DropShadow from "react-native-drop-shadow";

import Screen from "../../common/Screen";
import Button from "../../common/Button";
import Heading from "../../common/Heading";
import { chunkify } from "../../utility/chunkify";
import { getCurrentUser } from "../../api/userApi";
import { getBudgetTypes } from "../../api/budgetTypesApi";
import SearchForm from "../components/searchTransactions/SearchForm";
import TransactionAllocatorRow from "../components/TransactionAllocatorRow";
import TransactionAllocatorRowHeader from "../components/TransactionAllocatorRowHeader";
import {
  searchTransactions,
  saveTransaction,
} from "../../api/bankTransactionsApi";
import BudgetTypesEditor from "../components/budgetTypes/BudgetTypesEditor";

export default SearchTransactionsScreen = ({ navigation }) => {
  const [types, setTypes] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState({});
  const [budgetTypesEditorVisible, setBudgetTypesEditorVisible] =
    useState(false);
  const [totalDebits, setTotalDebits] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);

  useEffect(() => {
    (async () => await loadScreen())();
  }, []);

  const loadScreen = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) return;
      const data = await getBudgetTypes(user.id);
      const types = data.map((type) => type.category);
      types.unshift("");
      setTypes(types);
    } catch (err) {
      //console.log("...", err);
    } finally {
    }
  };

  const handleSearch = async (searchParameters) => {
    console.info(searchParameters);
    const result = await searchTransactions(1, 100000, searchParameters, false);
    //console.info(transactions);
    setTransactions(result.transactions);
    let debits = 0;
    let credits = 0;
    if (result.transactions.length > 0) {
      debits = result.transactions
        .map((t) => parseFloat(t.debitAmount))
        .reduce((a, b) => a + b, 0);
      credits = result.transactions
        .map((t) => parseFloat(t.creditAmount))
        .reduce((a, b) => a + b, 0);
    }
    setTotalDebits(debits.toFixed(2));
    setTotalCredits(credits.toFixed(2));
  };

  const handleUpdateTransaction = async (transaction) => {
    console.info(transaction);
    await saveTransaction(transaction);
    alert("Transaction updated successfully!");
  };

  const updateTransaction = (transaction, category) => {
    const objTrans = Object.assign({}, transaction, {
      myBudgetCategory: category,
    });
    const index = transactions.indexOf(transaction);
    const newtrans = [
      ...transactions.slice(0, index),
      objTrans,
      ...transactions.slice(index + 1),
    ];
    setTransactions(newtrans);
  };

  const handleSelectItem = (item, transaction) => {
    updateTransaction(transaction, item);
  };

  const handleOpenAddCategory = (transaction) => {
    setTransaction(transaction);
    setBudgetTypesEditorVisible(true);
  };

  const handleUpdatedBudgetType = async (transaction, category) => {
    setBudgetTypesEditorVisible(false);
    updateTransaction(transaction, category);
    const user = await getCurrentUser();
    await loadScreen();
  };

  return (
    <>
      <Screen navigation={navigation}>
        <Heading title="Search Transactions" />
        <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
          <SearchForm onSearch={handleSearch} />
          <DropShadow style={styles.shadowProp}>
            <View style={styles.list}>
              <TransactionAllocatorRowHeader
                totalCredits={totalCredits}
                totalDebits={totalDebits}
              />
              {transactions.length === 0 && (
                <Text style={{ textAlign: "center" }}>
                  Nil transactions found.
                </Text>
              )}
              {transactions.map((transaction, index) => (
                <TransactionAllocatorRow
                  key={index}
                  transaction={transaction}
                  rowIndex={index}
                  categories={types}
                  onSelectItem={handleSelectItem}
                  updaterRoleOnly={true}
                  onUpdate={handleUpdateTransaction}
                  onOpenAddCategory={handleOpenAddCategory}
                  //onOpenAddRule={handleOpenAddRule}
                />
              ))}
            </View>
          </DropShadow>
        </ScrollView>
      </Screen>
      <Modal visible={budgetTypesEditorVisible} transparent={true}>
        <View style={styles.transContainer}>
          <BudgetTypesEditor
            transaction={transaction}
            onClose={() => setBudgetTypesEditorVisible(false)}
            onUpdated={handleUpdatedBudgetType}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  list: {
    marginTop: 20,
    zIndex: -100,
    elevation: -100,
    padding: 10,
  },
  transContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
});
