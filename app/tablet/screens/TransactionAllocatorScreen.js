import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Modal, Alert, Text } from "react-native";

import {
  getTransactionsNotCategorized,
  saveAllocatedTransactions,
  getRunRules,
} from "../../api/bankTransactionsApi";
import { getCurrentUser } from "../../api/userApi";
import { getBudgetTypes } from "../../api/budgetTypesApi";
import TransactionAllocatorRow from "../components/TransactionAllocatorRow";
import TransactionAllocatorRowHeader from "../components/TransactionAllocatorRowHeader";
import BudgetTypesEditor from "../components/budgetTypes/BudgetTypesEditor";
import TransactionRulesEditor from "../components/transactionRules/TransactionRulesEditor";
import Button from "../../common/Button";
import Screen from "../../common/Screen";
import Heading from "../../common/Heading";
import { logIn } from "../../api/userApi";
import ProgressBar from "../../common/ProgressBar";

export default TransactionAllocatorScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [budgetTypesEditorVisible, setBudgetTypesEditorVisible] =
    useState(false);
  const [rulesEditorVisible, setRulesEditorVisible] = useState(false);
  const [allocatingMsg, setLoadingMsg] = useState("");
  const [ruleItem, setRuleItem] = useState(null);
  const [itemCounter, setItemCounter] = useState(0);

  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      loadScreen();
    });
    return subscribe;
  }, [navigation]);

  const loadScreen = async () => {
    try {
      setLoading(true);
      setLoadingMsg("Loading transactions...");
      //await logIn("malcolms65@gmail.com", "123456");

      const user = await getCurrentUser();
      const transactions = await getTransactionsNotCategorized(user.id);
      console.info("trans...", transactions.length);
      if (!user) return;
      loadCategoriesList(user.id);
      setTransactions(transactions);
    } catch (err) {
      console.log("...", err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategoriesList = async (id) => {
    const types = await getBudgetTypes(id);
    const categories = types.map((type) => type.category);
    categories.unshift("");

    setCategories(categories);
    // console.info(categories);
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

  const handleOpenAddRule = (transaction) => {
    const item = {
      id: 0,
      category: transaction.myBudgetCategory,
      search_keywords: transaction.narrative,
      amount: 0,
    };
    setTransaction(transaction);
    setRuleItem(item);
    setRulesEditorVisible(true);
  };

  const handleUpdatedBudgetType = async (transaction, category) => {
    setBudgetTypesEditorVisible(false);
    updateTransaction(transaction, category);
    const user = await getCurrentUser();
    loadCategoriesList(user.id);
  };

  const delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  const handleUpdatedRule = async (transaction, category) => {
    setRulesEditorVisible(false);
    updateTransaction(transaction, category);
    const user = await getCurrentUser();
  };

  const handleRunRules = async () => {
    setLoading(true);
    setLoadingMsg("Scanning all transactions...");
    delay(2000);
    const user = await getCurrentUser();
    const trans = await getRunRules(user.id);
    setTransactions(trans);
    setLoading(false);
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Allocate",
      "There are transactions that have not been allocated. Do you wish to continue? These transaction can be allocated later.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => saveAllocations() },
      ]
    );

  const saveAllocations = async () => {
    setLoading(true);
    setLoadingMsg("Saving allocated transactions...");
    delay(2000);
    const filtered = transactions.filter(
      (trans) => trans.myBudgetCategory !== ""
    );
    if (filtered.length === 0) {
      return;
    }
    await saveAllocatedTransactions(filtered);
    const user = await getCurrentUser();
    const leftover = await getTransactionsNotCategorized(user.id);
    setTransactions(leftover);
    setLoading(false);
  };

  const handleAllocate = async () => {
    let filtered = transactions.filter(
      (trans) => trans.myBudgetCategory === ""
    );
    if (filtered.length > 0) {
      if (createTwoButtonAlert()) {
        return;
      }
    } else {
      await saveAllocations();
    }
  };

  return (
    <>
      <Screen navigation={navigation}>
        <View style={styles.container}>
          <Heading title="Transaction Allocations" />
          <View style={styles.buttons}>
            <Button
              title="Run Rules"
              color="secondary"
              onPress={handleRunRules}
              fontSize={11}
              width={220}
            />
            <Button
              title="Save Allocations"
              color="secondary"
              onPress={handleAllocate}
              fontSize={11}
              width={220}
            />
          </View>
          {loading && (
            <>
              <View style={styles.allocatingMsg}>
                <Text>{allocatingMsg}</Text>
              </View>
            </>
          )}
          <TransactionAllocatorRowHeader />
          <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
            {transactions.map((transaction, index) => (
              <TransactionAllocatorRow
                key={index}
                transaction={transaction}
                rowIndex={index}
                categories={categories}
                onSelectItem={handleSelectItem}
                onOpenAddCategory={handleOpenAddCategory}
                onOpenAddRule={handleOpenAddRule}
              />
            ))}
          </ScrollView>
        </View>
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
      <Modal visible={rulesEditorVisible} transparent={true}>
        <View style={styles.transContainer}>
          <TransactionRulesEditor
            editOnly={false}
            item={ruleItem}
            transaction={transaction}
            onClose={() => setRulesEditorVisible(false)}
            onUpdated={handleUpdatedRule}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  allocatingMsg: {
    margin: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  budgetTypes: {
    margin: 0,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  container: {
    //marginTop: 40,
  },
  transContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
