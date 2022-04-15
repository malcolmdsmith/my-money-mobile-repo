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

  const handleSearch = async (searchParameters) => {
    console.info(searchParameters);
    const result = await searchTransactions(1, 100000, searchParameters, false);
    //console.info(transactions);
    setTransactions(result.transactions);
  };

  const handleSelectItem = () => {};

  return (
    <>
      <Screen navigation={navigation}>
        <Heading title="Search Transactions" />
        <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
          <SearchForm onSearch={handleSearch} />
          <View style={styles.list}>
            <TransactionAllocatorRowHeader />
            {transactions.map((transaction, index) => (
              <TransactionAllocatorRow
                key={index}
                transaction={transaction}
                rowIndex={index}
                categories={types}
                onSelectItem={handleSelectItem}
                updaterRoleOnly={true}
                //onOpenAddCategory={handleOpenAddCategory}
                //onOpenAddRule={handleOpenAddRule}
              />
            ))}
          </View>
        </ScrollView>
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
