export function allMonths(startDate: Date, endDate: Date) {
  let year = startDate.getFullYear();
  let month = startDate.getMonth();

  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();

  // console.log(year, month, endYear, endMonth);
  //   let result = {};
  let result = [];

  while (year < endYear || (year == endYear && month <= endMonth)) {
    const date = new Date();
    date.setMonth(month);
    // result[year] = result[year] ? result[year] : [];
    // result[year].push(date.toLocaleString("en", { month: "long" }));
    result.push(date.toLocaleString("en-US", { month: "long" }));
    month++;

    if (month > 11) {
      month = 0;
      year++;
    }
  }
  return result;

  //   console.log(result.flat());
}

export function getDatesInRange(
  startDate: Date,
  endDate: Date,
  startPos: number
) {
  const date = new Date(startDate);

  const years = new Map();
  const months = new Map();
  const dates = [];
  let currentYear = date.getFullYear();
  // let currentYearPosStart = 1;
  // let currentYearPosEnd = 1;
  let currentMonth = date.toLocaleString("en-US", { month: "long" });
  // let currentMonthPosStart = 1;
  // let currentMonthPosEnd = 1;
  let pos = startPos;

  while (date <= endDate) {
    // console.log(JSON.stringify(date, endDate));
    currentYear = date.getFullYear();
    years.has(currentYear)
      ? (years.get(currentYear).EndPos = pos + 1)
      : years.set(currentYear, {
          StartPos: pos,
          EndPos: pos + 1,
        });

    // console.log(JSON.stringify(years));
    currentMonth =
      date.getFullYear() +
      ":" +
      date.toLocaleString("en-US", { month: "long" });
    months.has(currentMonth)
      ? (months.get(currentMonth).EndPos = pos + 1)
      : months.set(currentMonth, {
          StartPos: pos,
          EndPos: pos + 1,
        });
    // years.set(date.getFullYear);
    // years[date.getFullYear];
    // months.push(date.toLocaleString("en-US", { month: "long" }));
    dates.push(date.getDate());
    date.setDate(date.getDate() + 1);
    pos++;
  }

  return { years: years, months: months, dates: dates };
}

function dateman() {
  //list of years between start end end
  let start = new Date("1/1/2023");
  let end = new Date("08/31/2034");
  console.log("year diff ", end.getFullYear() - start.getFullYear());
  const values = [
    ...Array(end.getFullYear() - start.getFullYear() + 1).keys(),
  ].map((i) => start.getFullYear() + i);

  // days remaining in a year
  start = new Date("1/5/2023");
  end = new Date("12/31/" + start.getFullYear());
  const days = (end - start) / 1000 / 60 / 60 / 24;
  console.log(days + 1);
  console.log(values);
}

// get all the dates between two dates
class MyDate {
  dates: Date[];
  constructor() {
    this.dates = [];
  }

  private addDays(currentDate) {
    let date = new Date(currentDate);
    date.setDate(date.getDate() + 1);
    return date;
  }

  getDates(startDate: Date, endDate: Date) {
    let currentDate: Date = startDate;
    while (currentDate <= endDate) {
      this.dates.push(currentDate);
      currentDate = this.addDays(currentDate);
    }

    return this.dates;
  }
}

let md = new MyDate();
let daysBetween: Date[] = md.getDates(
  new Date(2018, 7, 22),
  new Date(2018, 8, 30)
);
console.log(daysBetween);

// is the year leap?
const isLeap = (year: number) => {
  return new Date(year, 1, 29).getDate() === 29;
};

// date difference
const dateDiff = (d1, d2, res) => {
  let r = 1000; // seconds
  switch (res) {
    case "day":
      r = 24 * 3600 * 1000;
      break;
    case "week":
      r = 7 * 24 * 3600 * 1000;
      break;
    default:
  }
  //case 'month': r
  const diff = Math.floor((d2.getTime() - d1.getTime()) / r);
  return diff;
};

const start = new Date("2023-1-1");
const end = new Date("2025-2-25");
console.log(dateDiff(start, end, "week"));

// get all the years and the difference
let startFrom = 2;
// iterate over years and print out the distance of year start and end from start in "res unit"
[...Array(end.getFullYear() - start.getFullYear() + 1).keys()].map((i) => {
  let curr = start.getFullYear() + i;
  let firstDay = curr == start.getFullYear() ? start : new Date(curr + "-1-1");
  let lastDay = curr == end.getFullYear() ? end : new Date(curr + "-12-31");

  let startPos = startFrom + dateDiff(start, firstDay, "day");
  let endPos = startFrom + dateDiff(start, lastDay, "day");
  console.log(curr, ":", startPos, ":", endPos);
});
