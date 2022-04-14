import React, { Component, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../config/colors";

export default Picker = ({
  title,
  items,
  width = 100,
  listWidth = 100,
  height = 100,
  selectedItem,
  onSelectItem,
}) => {
  const [showList, setShowList] = useState(false);

  const handleSelectItem = (item) => {
    setShowList(false);
    onSelectItem(item);
  };

  return (
    <View style={styles.container} width={width}>
      <Text>{title}</Text>
      <TouchableOpacity onPress={() => setShowList(!showList)}>
        <Text style={styles.text}>{selectedItem}</Text>
      </TouchableOpacity>
      {showList && (
        <View
          style={[styles.listContainer, { height: height, width: listWidth }]}
        >
          {items.map((item, i) => (
            <TouchableOpacity key={i} onPress={() => handleSelectItem(item)}>
              <Text style={styles.listItem}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  listContainer: {
    position: "absolute",
    top: 60,
    marginLeft: 10,
    backgroundColor: colors.list,
  },
  listItem: {
    textAlign: "center",
    paddingTop: 10,
  },
  text: {
    backgroundColor: colors.white,
    height: 34,
    borderRadius: 5,
    borderColor: colors.border,
    borderWidth: 1,
    textAlign: "center",
    padding: 7,
  },
});
