import { zeroPad } from "./formatting";

export function getMySQLDate(date, sep = "/") {
  const numbers = date.split(sep);
  return numbers[2] + "-" + numbers[1] + "-" + numbers[0];
}

export function formatDate(argDate) {
  const slicedDate = argDate.slice(0, 10);
  const numbers = slicedDate.split("-");
  return numbers[2] + "-" + numbers[1] + "-" + numbers[0];
}

export function getDate(date) {
  const nums = date.split("-");
  return new Date(nums[2], nums[1] - 1, nums[0]);
}

export function getDDMMYYYY(date) {
  const m = date.getMonth() + 1;
  return (
    zeroPad(date.getDate(), 2) + "-" + zeroPad(m, 2) + "-" + date.getFullYear()
  );
}

// eslint-disable-next-line no-extend-native
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export function getToday() {
  const d = new Date();

  return { dateFrom: getDDMMYYYY(d), dateTo: getDDMMYYYY(d) };
}

export function getLongFormat(dateStr) {
  //  Convert a string like '2020-10-04T00:00:00' into '4/Oct/2020'
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = getDate(dateStr);
  let str =
    date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
  return str;
}

export function incrementPeriod(dateFrom, dateTo, increment, weeks, weekdays) {
  //console.info("incrementWeek...", dateFrom, dateTo);
  if (dateFrom === dateTo) {
    const enddate = getDate(dateTo);
    //console.info(enddate, weekdays);
    const startdate = enddate.addDays(-1 * weekdays);
    //console.info(startdate);
    return { dateFrom: getDDMMYYYY(startdate), dateTo: getDDMMYYYY(enddate) };
  } else {
    if (increment < 0) {
      //negative - decrease
      const enddate = getDate(dateFrom).addDays(-1);
      const startdate = enddate.addDays(increment * weekdays);
      return { dateFrom: getDDMMYYYY(startdate), dateTo: getDDMMYYYY(enddate) };
    } else if (increment > 0) {
      const startdate = getDate(dateTo).addDays(1);
      const enddate = startdate.addDays(increment * weekdays);
      return { dateFrom: getDDMMYYYY(startdate), dateTo: getDDMMYYYY(enddate) };
    } else return { dateFrom, dateTo };
  }
}
