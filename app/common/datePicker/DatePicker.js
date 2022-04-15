import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import PickerMonth from "./PickerMonth";
import { getDate, getDDMMYYYY } from "../../utility/dateFunctions";
import colors from "../../config/colors";

export default DatePicker = ({ title, selectedDay, onDaySelected }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDay);
  const [pickedDate, setPickedDate] = useState(selectedDay);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    //console.info("useEffect....", selectedDay);
    //setCurrentMonth(selectedDay);
    //console.info("useEffect in DatePicker...", pickedDate, selectedDay);
    setPickedDate(selectedDay);
  }, [selectedDay]);

  const calcCurrentMonth = (date, increment) => {
    const month = getDate(date).getMonth() + increment;
    const newdate = new Date(getDate(date).getFullYear(), month, 1);
    setCurrentMonth(getDDMMYYYY(newdate));
  };

  const handleMonthChange = (increment) => {
    calcCurrentMonth(currentMonth, increment);
  };

  const handleShowPicker = () => {
    calcCurrentMonth(pickedDate, 0);
    setShowPicker(!showPicker);
  };

  const handleDaySelected = (dayCell) => {
    setShowPicker(false);
    calcCurrentMonth(dayCell.date, 0);
    setPickedDate(dayCell.date);
    onDaySelected(dayCell);
  };

  return (
    <>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={handleShowPicker}>
          <Text>{title}</Text>
          <Text style={styles.text}>{pickedDate}</Text>
        </TouchableOpacity>
        {showPicker && (
          <View style={styles.container}>
            <PickerMonth
              selectedDay={pickedDate}
              currentMonth={currentMonth}
              onMonthChange={handleMonthChange}
              onDaySelected={handleDaySelected}
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    top: -2,
    left: 0,
    zIndex: 1000,
    elevation: 1000,
    //backgroundColor: "red",
  },
  text: {
    borderColor: colors.border,
    borderRadius: 5,
    borderWidth: 1,
    padding: 7,
    width: 120,
    textAlign: "center",
    backgroundColor: colors.white,
  },
});
