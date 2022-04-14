import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal, Alert } from "react-native";

import Screen from "../../common/Screen";
import Button from "../../common/Button";
import Heading from "../../common/Heading";
import BudgetTypesList from "../components/budgetTypes/BudgetTypesList";
import BudgetTypesEditor from "../components/budgetTypes/BudgetTypesEditor";
import { deleteBudgetType } from "../../api/budgetTypesApi";
import { chunkify } from "../../utility/chunkify";
import { getCurrentUser } from "../../api/userApi";
import { getBudgetTypes } from "../../api/budgetTypesApi";

export default BudgetTypesManagerScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    console.info("BudgetTypes...");
    (async () => await loadScreen())();
  }, []);

  const loadScreen = async () => {
    try {
      const user = await getCurrentUser();
      console.info("yser..", user);
      if (!user) return;
      const typesList = await getBudgetTypes(user.id);
      console.info(typesList.length);
      const types = chunkify(typesList, 3, true);
      setTypes(types);
    } catch (err) {
      console.log("...", err);
    } finally {
    }
  };

  const handleUpdated = async () => {
    await loadScreen();
  };

  const handleDelete = async (item) => {
    const result = await deleteBudgetType(item.id);
    console.info("result...", result);
    if (!result) {
      Alert.alert(
        "Delete",
        "Category has already been allocationed and cannot be deleted!"
      );
      return;
    }

    await loadScreen();
  };

  return (
    <>
      <Screen navigation={navigation}>
        <Heading title="Budget Types" />
        <Button
          title="Add Budget Type"
          icon="plus"
          color="secondary"
          width={240}
          iconSize={12}
          fontSize={11}
          onPress={() => setModalVisible(true)}
        />
        <View style={styles.container}>
          <BudgetTypesList types={types} onDelete={handleDelete} />
        </View>
      </Screen>
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modal}>
          <BudgetTypesEditor
            onUpdated={handleUpdated}
            onClose={() => setModalVisible(false)}
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
