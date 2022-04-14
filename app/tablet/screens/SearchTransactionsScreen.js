import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal, Alert, ScrollView } from "react-native";

import Screen from "../../common/Screen";
import Button from "../../common/Button";
import Heading from "../../common/Heading";
import { chunkify } from "../../utility/chunkify";
import { getCurrentUser } from "../../api/userApi";
import { getBudgetTypes } from "../../api/budgetTypesApi";
import SearchForm from "../components/searchTransactions/SearchForm";
import TransactionAllocatorRow from "../components/TransactionAllocatorRow";
import TransactionAllocatorRowHeader from "../components/TransactionAllocatorRowHeader";
import { searchTransactions } from "../../api/bankTransactionsApi";

export default SearchTransactionsScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [types, setTypes] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    (async () => await loadScreen())();
  }, []);

  const loadScreen = async () => {
    try {
      const user = await getCurrentUser();
      //console.info("yser..", user);
      if (!user) return;
      const typesList = await getBudgetTypes(user.id);
      //console.info(typesList.length);
      const types = chunkify(typesList, 3, true);
      setTypes(types);
    } catch (err) {
      //console.log("...", err);
    } finally {
    }
  };

  const handleUpdated = async () => {
    await loadScreen();
  };

  const handleSearch = async (dateFrom, dateTo) => {
    const data = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      amountFrom: 0,
      amountTo: 0,
      keywords: "",
      category: "",
    };
    //console.info(data);
    const result = await searchTransactions(1, 100000, data, false);
    //console.info(transactions);
    setTransactions(result.transactions);
  };

  const handleSelectItem = () => {};

  return (
    <>
      <Screen navigation={navigation}>
        <Heading title="Search Transactions" />
        <SearchForm onSearch={handleSearch} />
        <View style={styles.list}>
          <TransactionAllocatorRowHeader />
          <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
            {transactions.map((transaction, index) => (
              <TransactionAllocatorRow
                key={index}
                transaction={transaction}
                rowIndex={index}
                categories={types}
                onSelectItem={handleSelectItem}
                //onOpenAddCategory={handleOpenAddCategory}
                //onOpenAddRule={handleOpenAddRule}
              />
            ))}
          </ScrollView>
        </View>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  list: {
    marginTop: 20,
    zIndex: -100,
    elevation: -100,
  },
});
