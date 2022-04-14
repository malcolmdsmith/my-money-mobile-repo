import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import Shadow from "../../../common/DropShadow";
import { saveBudgetType, getBudgetTypes } from "../../../api/budgetTypesApi";
import { getCurrentUser } from "../../../api/userApi";

import {
  ErrorMessage,
  Form,
  FormField,
  FormPicker,
  SubmitButton,
} from "../../../common/forms";
import Button from "../../../common/Button";

const validationSchema = Yup.object().shape({
  category: Yup.string().required().max(100).label("Category"),
  parent_category: Yup.string().required().label("Parent Category"),
  owner_id: Yup.number().optional().label("User"),
});

export default BudgetTypesEditor = ({ transaction, onClose, onUpdated }) => {
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
    await saveBudgetType(data);
    onUpdated(transaction, data.category);
  };

  const handleCloseButton = () => {
    onClose();
  };
  const handleReset = () => {};

  return (
    <Shadow>
      <View style={styles.container}>
        <Form
          initialValues={{ category: "", parent_category: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          showClearButton={true}
          clearButtonIcon="trash-alt"
          clearButtonTitle="Clear"
          onHandleReset={handleReset}
          onClose={handleCloseButton}
          showSaveButton={true}
          showCloseButton={true}
        >
          <FormField
            autoCorrect={false}
            icon="pencil"
            name="category"
            placeholder="Category"
          />
          <FormPicker
            items={types}
            icon="clipboard-list-outline"
            name="parent_category"
            placeholder="Parent"
            numberOfColumns={4}
          />
        </Form>
      </View>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    marginTop: 40,
  },
  container: {
    backgroundColor: "rgb(189, 216, 243)",
    width: 500,
    height: 300,
    borderRadius: 25,
    padding: 20,
    borderColor: "#000",
    borderStyle: "solid",
    borderWidth: 2,
  },
});
