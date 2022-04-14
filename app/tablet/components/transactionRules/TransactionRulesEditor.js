import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import { getBudgetTypes } from "../../../api/budgetTypesApi";
import { saveTransactionRule } from "../../../api/transactionRuleApi";
import { getCurrentUser } from "../../../api/userApi";
import Shadow from "../../../common/DropShadow";

import {
  Form,
  FormField,
  FormPicker,
  SubmitButton,
} from "../../../common/forms";
import Button from "../../../common/Button";

const validationSchema = Yup.object().shape({
  id: Yup.number().optional().label("ID"),
  search_keywords: Yup.string().required().max(255).label("Search Keywords"),
  category: Yup.string().required().max(100).label("Category"),
  amount: Yup.number().optional().label("Amount"),
  owner_id: Yup.number().optional().label("User"),
});

export default TransactionRulesEditor = ({
  editOnly,
  item,
  transaction,
  closeOnSave,
  onUpdated,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    (async () => await loadScreen())();
  }, []);

  const loadScreen = async () => {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      if (!user) return;
      const typesList = await getBudgetTypes(user.id);
      const types = typesList.map((type) => type.category);
      setTypes(types);
    } catch (err) {
      console.log("...", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    console.info("data...", data);
    await saveTransactionRule(data);
    if (!editOnly) {
      onUpdated(transaction, data.category);
      return;
    }

    if (closeOnSave) {
      console.info("onClose");
      onClose();
    }
  };

  const handleCloseButton = () => {
    onClose();
  };
  const handleReset = () => {};

  return (
    <Shadow>
      <View style={styles.container}>
        <Form
          initialValues={{
            id: item.id,
            category: item.category,
            search_keywords: item.search_keywords,
            amount: item.amount,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          showClearButton={true}
          clearButtonIcon="trash-alt"
          clearButtonTitle="Clear"
          onHandleReset={handleReset}
          onClose={handleCloseButton}
          showCloseButton={true}
          showSaveButton={true}
        >
          <FormPicker
            items={types}
            icon="clipboard-list-outline"
            name="category"
            placeholder="Category"
            numberOfColumns={4}
          />
          <FormField
            autoCorrect={false}
            icon="pencil"
            name="search_keywords"
            placeholder="Search Keywords"
            height={100}
            multiline={true}
          />
          <FormField
            autoCorrect={false}
            icon="currency-usd"
            name="amount"
            placeholder="Amount"
            width={200}
          />
        </Form>
      </View>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    marginTop: 20,
  },
  container: {
    backgroundColor: "rgb(200, 243, 183)",
    width: 500,
    height: 450,
    borderRadius: 25,
    padding: 20,
    borderColor: "#000",
    borderStyle: "solid",
    borderWidth: 2,
  },
});
