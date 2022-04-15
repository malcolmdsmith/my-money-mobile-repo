import React from "react";
import { useFormikContext } from "formik";

import Picker from "../Picker";
import ErrorMessage from "./ErrorMessage";

function AppFormPicker({
  items,
  name,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  width,
  icon,
  onAddEntry,
  submitOnSelect = false,
  showPlaceholderAbove = false,
}) {
  const { errors, setFieldValue, touched, values, handleSubmit } =
    useFormikContext();

  return (
    <>
      <Picker
        items={items}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item) => {
          console.info("onSelectItem...", item);
          setFieldValue(name, item);
          if (submitOnSelect) handleSubmit();
        }}
        onClearItem={() => {
          console.info("ClearItem...");
          setFieldValue(name, null);
          handleSubmit();
        }}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width}
        icon={icon}
        onAddEntry={onAddEntry}
        showPlaceholderAbove={showPlaceholderAbove}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
