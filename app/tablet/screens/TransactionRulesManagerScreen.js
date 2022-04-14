import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal, Alert } from "react-native";

import Screen from "../../common/Screen";
import Button from "../../common/Button";
import Heading from "../../common/Heading";
import TransactionRulesList from "../components/transactionRules/TransactionRulesList";
import TransactionRulesEditor from "../components/transactionRules/TransactionRulesEditor";
import { getRules, deleteTransactionRule } from "../../api/transactionRuleApi";
import { chunkify } from "../../utility/chunkify";
import { getCurrentUser } from "../../api/userApi";

export default TransactionRulesManagerScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rules, setRules] = useState([]);
  const [item, setItem] = useState({
    search_keywords: "",
    category: "",
    id: 0,
    amount: 0,
  });

  useEffect(() => {
    (async () => await loadScreen())();
  }, []);

  const loadScreen = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) return;
      const rulesList = await getRules(user.id);
      const rules = chunkify(rulesList, 2, true);
      console.info("rules...", rules.length);
      setRules(rules);
    } catch (err) {
      console.log("...", err);
    } finally {
    }
  };

  const handleUpdated = async () => {
    await loadScreen();
  };

  const handleDelete = async (item) => {
    await deleteTransactionRule(item.id);
    await loadScreen();
  };

  const handleEdit = async (item) => {
    setItem(item);
    setModalVisible(true);
  };

  const handleEditorClose = async () => {
    await loadScreen();
    setModalVisible(false);
  };

  return (
    <>
      <Screen navigation={navigation}>
        <Heading title="Transaction Rules" />
        <Button
          title="Add Rule"
          icon="plus"
          color="secondary"
          width={200}
          iconSize={12}
          fontSize={11}
          onPress={() => setModalVisible(true)}
        />
        <View style={styles.container}>
          <TransactionRulesList
            rules={rules}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </View>
      </Screen>
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modal}>
          <TransactionRulesEditor
            editOnly={true}
            item={item}
            onUpdated={handleUpdated}
            onClose={handleEditorClose}
            closeOnSave={true}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  modal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
