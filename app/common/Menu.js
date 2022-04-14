import React, { Component, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";

import routes from "../tablet/navigation/routes";
import MenuItem from "./MenuItem";
import colors from "../config/colors";

export default Menu = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuPress = () => {
    if (showMenu) setShowMenu(false);
    else setShowMenu(true);
  };

  const handleSelection = (route) => {
    setShowMenu(false);
    navigation.navigate(route);
  };

  return (
    <>
      <View style={styles.menu}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.touchable} onPress={handleMenuPress}>
            <MaterialCommunityIcons
              name="menu"
              size={22}
              color={colors.tertiary}
            />
            <Text style={styles.text}>MENU</Text>
          </TouchableOpacity>
        </View>
        {showMenu && (
          <View style={{ position: "absolute", marginTop: 30 }}>
            <View style={styles.caret}>
              <AntDesign name="caretup" color="white" size={26} />
            </View>
            <View style={styles.menuContainer}>
              {routes.map((route, index) => (
                <MenuItem key={index} item={route} onSelect={handleSelection} />
              ))}
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  caret: {
    marginLeft: 60,
  },
  container: {
    flexDirection: "row",
    backgroundColor: colors.white,
    height: 35,
    alignItems: "center",
    paddingLeft: 10,
  },
  menu: {
    elevation: 1000,
    zIndex: 1000,
  },
  menuContainer: {
    position: "absolute",
    left: 20,
    top: 18,
    //  elevation: 1000,
    // zIndex: 1000,
    //backgroundColor: "rgb(233,233,232)",
    backgroundColor: colors.white,
    height: 260,
    width: 280,
    //    marginLeft: 20,
    borderRadius: 15,
  },
  text: {
    marginLeft: 10,
    color: colors.tertiary,
  },
  touchable: {
    flexDirection: "row",
  },
});
