import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Picker from "../../../common/Picker";

export default WeeksSelector = ({ weeks, onSelectedWeeks }) => {
  return (
    <View style={styles.container}>
      <Text>Weeks</Text>
      <Picker
        items={["1", "2", "4"]}
        selectedItem={weeks}
        width={80}
        onSelectItem={onSelectedWeeks}
        placeholder="Weeks"
        numberOfColumns={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
