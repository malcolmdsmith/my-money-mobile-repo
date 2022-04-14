import React from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";

import Button from "../Button";
import SubmitButton from "./SubmitButton";

function AppForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  resetValues,
  onHandleReset,
  showClearButton,
  clearButtonTitle,
  clearButtonIcon,
  showSaveButton = false,
  showCloseButton = false,
  onClose,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {(props) => (
        <>
          {children}
          <View style={styles.buttons}>
            {showSaveButton && (
              <SubmitButton
                title="Save"
                icon="smile"
                color="secondary"
                width={140}
              />
            )}
            {showClearButton && (
              <Button
                title={clearButtonTitle}
                icon={clearButtonIcon}
                onPress={() => {
                  props.resetForm({ values: resetValues });
                  onHandleReset();
                }}
                color="secondary"
                width={140}
              ></Button>
            )}
            {showCloseButton && (
              <Button
                title="Close"
                icon="window-close"
                color="secondary"
                width={140}
                onPress={onClose}
              />
            )}
          </View>
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    marginTop: 30,
  },
});
export default AppForm;
