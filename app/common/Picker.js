import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isTablet } from "react-native-device-detection";

import Text from "./Text";
import PickerItem from "./PickerItem";
import Button from "./Button";
import colors from "../config/colors";
import defaultStyles from "../config/styles";

function AppPicker({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  onClearItem,
  width = "100%",
  onAddEntry,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
          <MaterialCommunityIcons
            name="chevron-right"
            color={colors.border}
            size={20}
          />
        </View>
      </TouchableWithoutFeedback>
      {/* <MaterialCommunityIcons
        name="close-octagon-outline"
        size={22}
        color={defaultStyles.colors.medium}
        onPress={onClearItem}
      /> */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {onAddEntry && (
            <Button
              title="Add"
              color="heading"
              icon="plus"
              onPress={() => {
                setModalVisible(false);
                onAddEntry();
              }}
            />
          )}
          <Button
            title="Close"
            color="heading"
            onPress={() => setModalVisible(false)}
            icon="window-close"
          />
          <FlatList
            style={styles.list}
            data={items}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numberOfColumns}
            horizontal={false}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: "row",
    //flex: 1,
    borderRadius: 20,
    padding: 12,
    marginVertical: 0,
    height: 45,
  },
  icon: {
    marginRight: 10,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
  list: {},
  modalContainer: {
    width: isTablet ? "80%" : "100%",
    // justifyContent: "center",
    padding: 20,
  },
  text: {
    flex: 1,
    textAlign: "center",
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
});

export default AppPicker;
