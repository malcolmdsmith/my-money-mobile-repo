import React, { Component, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

//import Example from "./ChartTest";
import { BarChart } from "react-native-chart-kit";
import colors from "../../config/colors";

const chartConfig = {
  backgroundGradientFrom: "white",
  //backgroundGradientFromOpacity: 0.3,
  backgroundGradientTo: "white",
  //backgroundGradientToOpacity: 0.8,
  //backgroundColor: "white",
  color: (opacity = 1) => `rgba(136, 132, 216, 2)`,
  //color: "#8884d8",
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  propsForLabels: {
    fontSize: 13,
    stroke: "#000",
  },
  fillShadowGradient: "blue",
  fillShadowGradientOpacity: 1,
};

export default ChartManager = ({ chartData }) => {
  const getData = () => {
    // console.info("chartData...", chartData);

    let l = chartData.map((exp) => exp.category);
    let ds = chartData.map((exp) => exp.totalDebits);
    let colors = [];
    for (let i = 0; i < chartData.length; i++) {
      colors.push((opacity = 1) => `#8884d8`);
    }

    const data = {
      labels: l,
      datasets: [{ data: ds }],
      colors: colors,
    };
    //console.info("summary.expenses...", data);
    return data;
  };

  return (
    <BarChart
      style={styles.graphStyle}
      data={getData()}
      width={Dimensions.get("window").width * 0.8}
      height={500}
      yAxisLabel="$"
      chartConfig={chartConfig}
      verticalLabelRotation={50}
      showValuesOnTopOfBars={true}
      fromZero={true}
      withDots={true}
    />
  );
};

const styles = StyleSheet.create({
  graphStyle: {},
});
