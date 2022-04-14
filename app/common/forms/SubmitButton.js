import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function SubmitButton({
  title,
  icon,
  color,
  notifySubmit,
  navTo,
  width = 140,
}) {
  const { handleSubmit } = useFormikContext();
  return (
    <Button
      title={title}
      icon={icon}
      color={color}
      width={width}
      onPress={() => {
        handleSubmit();
        if (notifySubmit) notifySubmit(navTo);
      }}
    />
  );
}

export default SubmitButton;
