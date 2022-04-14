import { UserInterfaceIdiom } from "expo-constants";
import { searchTransactions } from "../../../api/bankTransactionsApi";
import { getCategoryTotals } from "../../../utility/dataFunctions";
import {
  getDDMMYYYY,
  getDate,
  getLongFormat,
} from "../../../utility/dateFunctions";
import { getCurrentUser } from "../../../api/userApi";

export async function getDashboardData(
  startDate,
  numWeeks,
  increment,
  expensesToShow
) {
  const period = getStartAndEndDates(startDate, numWeeks, increment);
  const data = getSearchData(period.dateFrom, period.dateTo);

  const searchResult = await searchTransactions(1, 1000000, data, false);

  if (searchResult.totalCount > 0) {
    const summary = getCategoryTotals(searchResult.transactions);
    return {
      transactionCount: searchResult.totalCount,
      summary: summary,
      chartData: getChartData(summary, expensesToShow),
      message: "",
      dateFrom: period.dateFrom,
      dateTo: period.dateTo,
      dateRange:
        "  " +
        getLongFormat(period.dateFrom) +
        " to " +
        getLongFormat(period.dateTo),
    };
    //console.info("count..", searchResult.totalCount, summary);
  } else {
    //console.info("Else");
    return {
      transactionCount: 0,
      summary: { totalIncome: 0, totalExpenses: 0, expenses: [], income: [] },
      chartData: [],
      dateFrom: period.dateFrom,
      dateTo: period.dateTo,
      dateRange: "  " + period.dateFrom + " to " + period.dateTo,
    };
  }
}

export function getDefaultData() {
  return {
    transactionCount: 0,
    summary: { totalIncome: 0, totalExpenses: 0, expenses: [], income: [] },
    dateFrom: "",
    dateTo: "",
    dateRange: " to ",
    chartData: [],
  };
}

function getStartAndEndDates(startDate, numWeeks, increment) {
  //return incrementPeriod(startDate, startDate, increment, 0, numWeeks * 7 - 1);
  const val = numWeeks * increment * 7;
  const date = getDate(startDate).addDays(val);
  const days = 1 - numWeeks * 7;
  //console.info("days...", days);
  return {
    dateFrom: getDDMMYYYY(date.addDays(days)),
    dateTo: getDDMMYYYY(date),
  };
}

export function getSearchData(dateFrom, dateTo) {
  const data = {
    dateFrom: dateFrom,
    dateTo: dateTo,
    category: "",
    amountFrom: 0,
    amountTo: 0,
    keywords: "",
  };
  return data;
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function getChartData(summary, expensesToShow) {
  //console.info("expensesToShow...", expensesToShow);
  let numColumns = summary[expensesToShow].length;

  if (numColumns <= 22) {
    return summary[expensesToShow];
  }

  let columns = summary[expensesToShow].slice(0, 21);
  let other = {};
  let total = 0;
  for (let i = 22; i < summary[expensesToShow].length; i++) {
    total += summary[expensesToShow][i].totalDebits;
  }
  other.category = "Other";
  other.totalDebits = total;
  other.totalDebitFormatted = total.toFixed(2);
  columns.push(other);
  console.info("columns...", columns);
  return columns;
}
