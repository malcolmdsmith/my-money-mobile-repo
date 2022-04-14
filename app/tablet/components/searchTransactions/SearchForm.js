import React, { Component, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import DropShadow from "react-native-drop-shadow";
import * as Yup from "yup";

import Button from "../../../common/Button";
import storage from "../../../utility/localStorage";
import DatePicker from "../../../common/datePicker/DatePicker";
import { getToday } from "../../../utility/dateFunctions";
import colors from "../../../config/colors";
import { incrementPeriod } from "../../../utility/dateFunctions";
import { getBudgetTypes } from "../../../api/budgetTypesApi";
import { getCurrentUser } from "../../../api/userApi";
import {
  Form,
  FormField,
  FormPicker,
  SubmitButton,
} from "../../../common/forms";

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

  useEffect(() => {
    (async () => await initializeForm())();
  }, []);

  const initializeForm = async () => {
    const user = await getCurrentUser();
    const types = await getBudgetTypes(user.id);
    // console.info(types);
    setBudgetTypes(types.map((t) => t.category));
    let startDate = await storage.get("@search-dateTo");
    console.info("Startdate...", startDate);
    if (startDate === null) {
      const periods = getToday();
      const range = incrementPeriod(
        periods.dateFrom,
        periods.dateFrom,
        -1,
        0,
        7
      );
      setDateFrom(range.dateFrom);
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

  const handleSearch = async (data) => {
    onSearch(dateFrom, dateTo);
  };

  return (
    <DropShadow style={styles.shadowProp}>
      <View style={styles.container}>
        <Form
          initialValues={{
            dateFrom: "",
            dateTo: "",
            category: "",
            amountFrom: 0,
            amountTo: 0,
            keywords: "",
          }}
          onSubmit={handleSearch}
          validationSchema={validationSchema}
          showClearButton={true}
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
            <Button icon="backward" color="heading" width={100} />
            <Button icon="forward" color="heading" width={100} />
          </View>

          <View style={styles.categoryContainer}>
            <FormPicker
              items={budgetTypes}
              icon="clipboard-list-outline"
              name="category"
              placeholder="Category"
              numberOfColumns={4}
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
        </Form>
        <View style={styles.searchButton}>
          <Button title="Search" width={120} onPress={handleSearch} />
        </View>
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
    width: 630,
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
    width: 500,
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
