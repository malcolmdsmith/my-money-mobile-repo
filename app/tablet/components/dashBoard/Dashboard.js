import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import DashboardPanel from "./DashboardPanel";
import IncomeExpensesCard from "./IncomeExpensesCard";
import storage from "../../../utility/localStorage";
import { getDashboardData, getDefaultData } from "./helper";
import { getToday } from "../../../utility/dateFunctions";
import colors from "../../../config/colors";
import Shadow from "../../../common/DropShadow";
import ChartManager from "../ChartManager";

export default Dashboard = () => {
  const [startDate, setStartDate] = useState("");
  const [numWeeks, setNumWeeks] = useState("2");
  const [dashboardData, setDashboardData] = useState(getDefaultData());
  const [expensesToShow, setExpensesToShow] = useState("expenses");
  const [totalExpensesToShow, setTotalExpensesToShow] =
    useState("totalExpenses");

  useEffect(() => {
    (async () => await initializeDashboard())();
  }, []);

  const initializeDashboard = async () => {
    let startDate = await storage.get("@dashboard-startDate");
    if (startDate === null) {
      const periods = getToday();
      startDate = periods.dateFrom;
    }
    //startDate = "29-12-2021";
    setStartDate(startDate);
    //console.info("startDate...", startDate);
    await loadDashboard(startDate, 2, 0);
  };

  const loadDashboard = async (date, weeks, increment) => {
    //console.info("loadDashboard...", date, weeks, increment, expensesToShow);
    const data = await getDashboardData(date, weeks, increment, expensesToShow);
    setDashboardData(data);
    //console.info("loadDashboard...", expensesToShow);
  };

  const handleIncrement = async (date, weeks, increment, showRent) => {
    if (showRent) {
      setExpensesToShow("expenses");
      setTotalExpensesToShow("totalExpenses");
      const data = await getDashboardData(date, weeks, increment, "expenses");
      setDashboardData(data);
    } else {
      setExpensesToShow("expensesLessRent");
      setTotalExpensesToShow("totalExpensesLessRent");
      const data = await getDashboardData(
        date,
        weeks,
        increment,
        "expensesLessRent"
      );
      setDashboardData(data);
    }
    //await loadDashboard(date, weeks, increment);
  };

  return (
    <Shadow>
      <ScrollView contentContainerStyle={{ paddingBottom: 280 }}>
        <View style={styles.container}>
          <DashboardPanel
            startDate={startDate}
            numWeeks={numWeeks}
            onIncrementPeriod={handleIncrement}
          />
          <View style={styles.panel}>
            <IncomeExpensesCard
              dashboardData={dashboardData}
              expensesToShow={expensesToShow}
              totalExpensesToShow={totalExpensesToShow}
            />
          </View>
          <View style={styles.chart}>
            <ChartManager
              chartData={dashboardData.chartData}
              expensesToShow={expensesToShow}
              totalExpensesToShow={totalExpensesToShow}
            />
          </View>
        </View>
      </ScrollView>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  chart: {
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    width: "100%",
    backgroundColor: colors.white,
    zIndex: -100,
    elevation: -100,
  },
  container: {},
  panel: {
    backgroundColor: colors.white,
    zIndex: -1000,
    width: "100%",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
});
