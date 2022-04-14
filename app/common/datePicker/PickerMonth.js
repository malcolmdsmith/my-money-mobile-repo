import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { getMonthDays, getMonthFullName } from "./helper";
import { getDate } from "../../utility/dateFunctions";
import Link from "../Link";
import PickerDay from "./PickerDay";
import colors from "../../config/colors";

export default PickerMonth = ({
  onMonthChange,
  currentMonth,
  selectedDay,
  onDaySelected,
}) => {
  const [days, setDays] = useState([]);

  useEffect(() => {}, [currentMonth]);

  const getMonthDescription = () => {
    //console.info(selectedDay);
    return getMonthFullName(getDate(currentMonth));
  };

  const getDays = () => {
    //console.info("getDays.....", selectedDay);
    const days = getMonthDays(getDate(currentMonth), selectedDay);
    return days;
    //console.info(selectedDay, days);
    //setDays(days);
  };

  const handleDaySelected = (dayCell) => {
    //    console.info("dayCell...", dayCell);
    onDaySelected(dayCell);
  };

  return (
    <>
      <View style={styles.caret}>
        <AntDesign name="caretup" color={colors.border} size={26} />
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Link title="" icon="backward" onPress={() => onMonthChange(-1)} />
          <Text style={styles.month}>{getMonthDescription()}</Text>
          <Link title="" icon="forward" onPress={() => onMonthChange(1)} />
        </View>
        <View style={styles.daysHeader}>
          <Text style={styles.day}>Mo</Text>
          <Text style={styles.day}>Tu</Text>
          <Text style={styles.day}>We</Text>
          <Text style={styles.day}>Th</Text>
          <Text style={styles.day}>Fr</Text>
          <Text style={styles.day}>Sa</Text>
          <Text style={styles.day}>Su</Text>
        </View>
        <View style={styles.daysContainer}>
          {getDays().map((item, index) => (
            <PickerDay
              key={index}
              item={item}
              onDaySelected={handleDaySelected}
            />
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  caret: {
    marginLeft: 30,
  },
  container: {
    position: "absolute",
    top: 18,
    width: 284,
    borderRadius: 0,
    borderColor: colors.border,
    borderWidth: 1,
    zIndex: 1000,
    elevation: 1000,
  },
  day: {
    width: 40,
    padding: 2,
    textAlign: "center",
  },
  daysContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  daysHeader: {
    flexDirection: "row",
    backgroundColor: "rgb(229,239,245)",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "rgb(229,239,245)",
    justifyContent: "space-between",
    padding: 5,
  },
  month: {
    fontWeight: "bold",
  },
});
