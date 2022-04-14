import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import CheckBox from "react-native-check-box";

import DropShadow from "react-native-drop-shadow";
import DatePicker from "../../../common/datePicker/DatePicker";
import Picker from "../../../common/picker/Picker";
import Button from "../../../common/Button";
import colors from "../../../config/colors";

export default DashboardPanel = ({
  startDate,
  numWeeks,
  onIncrementPeriod,
}) => {
  const [weeks, setWeeks] = useState(numWeeks);
  const [pickerDate, setPickerDate] = useState(startDate);
  const [incrementValue, setIncrementValue] = useState(0);
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    //console.info("useEffect....", selectedDay);
    //setCurrentMonth(selectedDay);
    //console.info("useEffect DP in DatePicker...pickerDate", pickerDate);
    //console.info("useEffect DP in DatePicker...", startDate);
    setPickerDate(startDate);
  }, [startDate]);

  const handleDaySelected = (item) => {
    console.info(item);
    setPickerDate(item.date);
    onIncrementPeriod(pickerDate, weeks, incrementValue, isChecked);
  };

  const handleSelectedWeeks = (weeks) => {
    setWeeks(weeks);
    onIncrementPeriod(startDate, weeks, 0, isChecked);
  };

  const handlePreviousPeriod = () => {
    const increment = incrementValue - 1;
    setIncrementValue(increment);
    onIncrementPeriod(pickerDate, weeks, increment, isChecked);
  };

  const handleNextPeriod = () => {
    const increment = incrementValue + 1;
    setIncrementValue(increment);
    onIncrementPeriod(pickerDate, weeks, increment, isChecked);
  };

  const handleCheckbox = () => {
    const checked = !isChecked;
    setIsChecked(checked);
    onIncrementPeriod(pickerDate, weeks, incrementValue, checked);
  };

  return (
    <DropShadow style={styles.shadowProp}>
      <View style={styles.container}>
        <View style={{ marginRight: 10 }}>
          <DatePicker
            title="Start Date"
            selectedDay={pickerDate}
            onDaySelected={handleDaySelected}
          />
        </View>
        <Picker
          title="Weeks"
          items={["1", "2", "4", "8", "12", "16", "52"]}
          selectedItem={weeks}
          onSelectItem={handleSelectedWeeks}
          height={200}
        />
        <CheckBox
          style={{ flex: 1, padding: 5 }}
          onClick={handleCheckbox}
          isChecked={isChecked}
          leftText={"Show Rent"}
        />
        <Button
          title=""
          icon="backward"
          width={120}
          onPress={handlePreviousPeriod}
        />
        <Button
          title=""
          icon="forward"
          width={120}
          onPress={handleNextPeriod}
        />
      </View>
    </DropShadow>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.medium,
    borderRadius: 25,
    padding: 15,
    flexDirection: "row",
    width: 630,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  text: {
    borderColor: "#000",
    borderWidth: 2,
    padding: 2,
    width: 120,
  },
});
