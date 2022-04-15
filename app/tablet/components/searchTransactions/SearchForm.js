import React, { Component, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import DropShadow from "react-native-drop-shadow";
import * as Yup from "yup";

import Button from "../../../common/Button";
import storage from "../../../utility/localStorage";
import DatePicker from "../../../common/datePicker/DatePicker";
import { getToday } from "../../../utility/dateFunctions";
import colors from "../../../config/colors";
import { incrementPeriod, incrementDate } from "../../../utility/dateFunctions";
import { getBudgetTypes } from "../../../api/budgetTypesApi";
import { getCurrentUser } from "../../../api/userApi";
import {
  Form,
  FormField,
  FormPicker,
  SubmitButton,
} from "../../../common/forms";
import Picker from "../../../common/picker/Picker";

const validationSchema = Yup.object().shape({
  dateFrom: Yup.string().label("Date From"),
  dateTo: Yup.string().label("Date To"),
  category: Yup.string().max(100).label("Category"),
  keywords: Yup.string().label("Keywords"),
  amountFrom: Yup.number().optional().label("Amount From"),
  amountTo: Yup.number().optional().label("Amount To"),
});

export default SearchForm = ({ onSearch }) => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [budgetTypes, setBudgetTypes] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("Today");
  const [periods] = useState([
    "Today",
    "This Week",
    "This Fortnight",
    "This Month",
    "This Quarter",
    "This Financial Year",
    "This Calendar Year",
  ]);

  useEffect(() => {
    (async () => await initializeForm())();
  }, []);

  const initializeForm = async () => {
    const user = await getCurrentUser();
    const types = await getBudgetTypes(user.id);
    // console.info(types);
    setBudgetTypes(types.map((t) => t.category));
    let startDate = null; //await storage.get("@search-dateTo");
    console.info("Startdate...", startDate);
    if (startDate === null) {
      const periods = getToday();
      // const range = incrementPeriod(
      //   periods.dateFrom,
      //   periods.dateFrom,
      //   -1,
      //   0,
      //   7
      // );
      setDateFrom(periods.dateFrom);
      setDateTo(periods.dateTo);
      //      console.info(periods.dateFrom);
      return;
    }
    //startDate = "29-12-2021";
    setDateFrom(startDate);
    setDateTo(startDate);
  };

  const handleDateFromSelected = (item) => {
    console.info(item);
    setDateFrom(item.date);
  };
  const handleDateToSelected = (item) => {
    console.info(item);
    setDateFrom(item.date);
  };

  const handleIncrease = () => {
    handleIncrement(1, selectedPeriod);
  };

  const handleDecrease = () => {
    handleIncrement(-1, selectedPeriod);
  };

  const handleIncrement = (value, periodType) => {
    const dateRange = incrementDate(periodType, dateFrom, dateTo, value);
    updateDateRangeState(dateRange);
  };

  const updateDateRangeState = (dateRange) => {
    console.info(dateRange.dateFrom);
    setDateFrom(dateRange.dateFrom);
    setDateTo(dateRange.dateTo);
  };

  const handleSearch = async (data) => {
    //console.info(data);
    const searchParameters = {
      dateFrom,
      dateTo,
      amountFrom: data.amountFrom,
      amountTo: data.amountTo,
      category: data.category,
      keywords: data.keywords,
    };
    onSearch(searchParameters);
  };

  const handleSelectedPeriod = (data) => {
    console.info("periodType...", data);
    setSelectedPeriod(data);
    handleIncrement(0, data);
  };

  const handleReset = () => {};

  return (
    <DropShadow style={styles.shadowProp}>
      <View style={styles.container}>
        <Form
          initialValues={{
            // dateFrom: "",
            // dateTo: "",
            category: "",
            amountFrom: 0,
            amountTo: 0,
            keywords: "",
          }}
          onSubmit={handleSearch}
          onHandleReset={handleReset}
          validationSchema={validationSchema}
          showClearButton={true}
          showSaveButton={true}
          saveButtonTitle="Search"
          clearButtonIcon="trash-alt"
          clearButtonTitle="Clear"
        >
          <View style={styles.dateRangeContainer}>
            <DatePicker
              title="Date From"
              selectedDay={dateFrom}
              onDaySelected={handleDateFromSelected}
            />
            <DatePicker
              title="Date To"
              selectedDay={dateTo}
              onDaySelected={handleDateToSelected}
            />
            <Button
              icon="backward"
              color="heading"
              width={100}
              onPress={handleDecrease}
            />
            <Button
              icon="forward"
              color="heading"
              width={100}
              onPress={handleIncrease}
            />
            <Picker
              items={periods}
              title="Set date range to"
              onSelectItem={handleSelectedPeriod}
              selectedItem={selectedPeriod}
              listWidth={200}
              width={200}
              height={220}
            />
          </View>

          <View style={styles.categoryContainer}>
            <FormPicker
              items={budgetTypes}
              icon="clipboard-list-outline"
              name="category"
              placeholder="Category"
              numberOfColumns={4}
              showPlaceholderAbove={true}
            />
          </View>
          <View style={styles.amountsContainer}>
            <FormField
              autoCorrect={false}
              icon="pencil"
              name="amountFrom"
              placeholder="Amount From"
              width={160}
              showLabelAbove={true}
            />
            <FormField
              autoCorrect={false}
              icon="pencil"
              name="amountTo"
              placeholder="Amount To"
              width={160}
              showLabelAbove={true}
            />
          </View>
          <View style={styles.rowContainer}>
            <FormField
              autoCorrect={false}
              icon="pencil"
              name="keywords"
              placeholder="Description"
              width={260}
              showLabelAbove={true}
            />
          </View>
          {/* <View style={{ height: 25 }}></View> */}
          {/* <View style={styles.searchButton}>
            <Button title="Search" width={120} />
          </View> */}
        </Form>
      </View>
    </DropShadow>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.medium,
    borderRadius: 25,
    padding: 20,
    flexDirection: "column",
    width: 750,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    zIndex: -1000,
    elevation: -1000,
  },
  amountsContainer: {
    flexDirection: "row",
    width: 340,
    justifyContent: "space-evenly",
    marginTop: 10,
    zIndex: -1000,
    elevation: -1000,
  },
  categoryContainer: {
    flexDirection: "row",
    width: 300,
    marginTop: 45,
    zIndex: -1000,
    elevation: -1000,
  },
  rowContainer: {
    flexDirection: "row",
    zIndex: -1000,
    elevation: -1000,
  },
  dateRangeContainer: {
    flexDirection: "row",
    width: 700,
    justifyContent: "space-evenly",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  searchButton: {
    alignSelf: "flex-end",
    elevation: -1000,
    zIndex: -1000,
  },
});
