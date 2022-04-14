import React, { Component, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import ProgressBar from "../../common/ProgressBar";
import Button from "../../common/Button";

export default TestScreen = () => {
  const [cntr, setCntr] = useState(1);

  const runProcess = () => {
    setCntr(0);
    for (let i = 1; i <= 100; i++) {
      setCntr(i);
    }
  };

  return (
    <>
      <Button title="Run" onPress={() => runProcess()} />
      <Text>{cntr}</Text>
      <ProgressBar value={cntr} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});
