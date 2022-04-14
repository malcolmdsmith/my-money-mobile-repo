import React, { Component, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../../config/colors";

import SummaryCard from "./SummaryCard";
import { chunkify } from "../../../utility/chunkify";

export default IncomeExpensesCard = ({
  dashboardData,
  expensesToShow,
  totalExpensesToShow,
}) => {
  const getChunks = () => {
    let chunks = [];
    let count = 0;
    if (dashboardData.summary[expensesToShow] !== undefined)
      count = dashboardData.summary[expensesToShow].length;
    if (count === 0) return [];
    if (count <= 14) chunks.push(dashboardData.summary[expensesToShow]);
    else if (count > 25)
      chunks = chunkify(dashboardData.summary[expensesToShow], 3, true);
    else chunks = chunkify(dashboardData.summary[expensesToShow], 2, true);
    return chunks;
  };

  const showExpensesTotal = () => {
    let count = 0;
    if (dashboardData.summary[expensesToShow] !== undefined)
      count = dashboardData.summary[expensesToShow].length;
    return count > 1;
  };

  const showNil = () => {
    let count = 0;
    if (dashboardData.summary[expensesToShow] !== undefined)
      count = dashboardData.summary[expensesToShow].length;
    return count === 0;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dateRange}>Period: {dashboardData.dateRange}</Text>
      <View style={styles.cards}>
        <View>
          <View style={styles.income}>
            <Text style={styles.text}>Income</Text>
            {dashboardData.summary.income.length > 1 ? (
              <Text style={styles.totalIncome}>
                {dashboardData.summary.totalIncome}
              </Text>
            ) : null}
          </View>
          <SummaryCard
            data={dashboardData.summary.income}
            totalField="totalCreditFormatted"
          />
        </View>
        <View>
          <View style={styles.expenses}>
            <Text style={styles.text}>Expenses</Text>
            {showExpensesTotal() ? (
              <Text style={styles.totalExpenses}>
                {dashboardData.summary[totalExpensesToShow]}
              </Text>
            ) : null}
          </View>
          <View style={styles.chunks}>
            {showNil() ? <Text>Nil.</Text> : null}
            {getChunks().map((chunk, i) => (
              <SummaryCard
                key={i}
                data={chunk}
                totalField="totalDebitFormatted"
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cards: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-evenly",
  },
  chunks: {
    flexDirection: "row",
  },
  container: {},
  dateRange: {
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  income: {
    width: 230,
    borderBottomColor: colors.border,
    borderBottomWidth: 2,
    marginRight: 20,
    marginBottom: 10,
    flexDirection: "row",
  },
  expenses: {
    width: 660,
    borderBottomColor: colors.border,
    borderBottomWidth: 2,
    marginBottom: 10,
    flexDirection: "row",
  },
  text: {
    fontWeight: "bold",
  },
  totalExpenses: {
    marginLeft: 45,
    textAlign: "right",
    width: 90,
  },
  totalIncome: {
    marginLeft: 60,
    textAlign: "right",
    width: 90,
  },
});
