const getIncomeAfterTax = (totalIncome) => {
  if (totalIncome == null) return null;

  // total after federal tax
  let total = 0;
  if (totalIncome >= 539900) {
    total = totalIncome - taxes(162718, totalIncome - 539900, 0.37);
  }
  else if (totalIncome >= 215950) {
    total = totalIncome - taxes(49335.5, totalIncome - 215950, 0.35);
  }
  else if (totalIncome >= 170050) {
    total = totalIncome - taxes(34647.5, totalIncome - 170050, 0.32);
  }
  else if (totalIncome >= 89075) {
    total = totalIncome - taxes(15213.5, totalIncome - 89075, 0.24);
  }
  else if (totalIncome >= 41775) {
    total = totalIncome - taxes(4807.5, totalIncome - 41775, 0.22);
  }
  else if (totalIncome >= 10275) {
    total = totalIncome - taxes(1027.5, totalIncome - 10275, 0.12);
  }
  else {
    total = totalIncome - taxes(0, totalIncome, 0.1);
  }

  // total after state tax
  total -= (totalIncome * 0.0425);

  // total after FICA
  total -= (totalIncome * 0.0765);

  return total.toFixed(2);
}

const taxes = (owed, additional, rate) => {
  return owed + (additional * rate);
}


const getYearlyIncome = (incomes, freqOptions) => {
  let total = 0;
  incomes.forEach((income) => {
    if (income.freq === freqOptions[0]) total += (income.amount * 52);
    else if (income.freq === freqOptions[1]) total += (income.amount * 26);
    else if (income.freq === freqOptions[2]) total += (income.amount * 12);
  });

  return total;
}


// get percent of income for each budget area
const getPercentOfIncome = (numerator, denominator) => {
  let percent = parseFloat((numerator / denominator * 100).toFixed(1));
  return percent;
}

// get budget amount for entire year based on amount and dur
const getBudgetAmountPerYear = (budgetArea, durOptions) => {
  if (budgetArea.dur === durOptions[0]) return budgetArea.amount * 52;
  else if (budgetArea.dur === durOptions[1]) return budgetArea.amount * 26;
  else if (budgetArea.dur === durOptions[2]) return budgetArea.amount * 12;
  else return null;
}

// get total percent of all budget areas
const getTotalPercent = (store, durOptions) => {
  let total = 0;
  store.state.data.budgetAreas.forEach((area) => {
    total += getPercentOfIncome(getBudgetAmountPerYear(area, durOptions), store.state.data.yearlyTaxedIncome);
  });
  return parseFloat(total.toFixed(1));
}


// get total money used in one budget area
// returns a number (not a string)
const getBudgetAreaTotalUsed = (spentArray) => {
  let total = 0;
  spentArray.forEach((obj) => {
    total += obj.amount;
  });
  return total;
}

// ! TEMPORARILY NOT USING THIS FUNCTION
// get total budget amount for one budget area (for current budget period)
const getBudgetAreaTotalPerPeriod = (area, budgetPeriod, store) => {
  const budgetAreaOptions = store.state.options.budgetAreas;
  const budgetPeriodOptions = store.state.options.budgetPeriod;
  let total = area.amount;
  
  // find total per year first
  if (area.dur === budgetAreaOptions[0]) { // 1 week
    total *= 52;
  }
  else if (area.dur === budgetAreaOptions[1]) { // 2 weeks 
    total *= 26;
  }
  else if (area.dur === budgetAreaOptions[2]) { // 1 month
    total *= 12;
  }

  // find total based on budgetPeriod now
  if (budgetPeriod === budgetPeriodOptions[0]) { // 1w
    total /= 52;
  }
  else if (budgetPeriod === budgetPeriodOptions[1]) { // 2w
    total /= 26;
  }
  else if (budgetPeriod === budgetPeriodOptions[2]) { // 1mo
    total /= 12;
  }

  return parseFloat(total.toFixed(2));
}


const getDate = () => {
  let date = {};
  [date.month, date.day, date.year] = new Date().toLocaleString().split('/');
  date.year = date.year.split(',')[0];
  date.day = parseFloat(date.day);
  date.month = parseFloat(date.month);
  date.year = parseFloat(date.year);

  return date;
}


// get difference in 2 dates
const getDateDifference = (date1, date2) => 
{
  let daysOffset = Math.floor(dateDifferenceHelper(date1.year, date1.month, date1.day));
  let daysOffset2 = Math.floor(dateDifferenceHelper(date2.year, date2.month, date2.day));

  return daysOffset2 - daysOffset;
}
const dateDifferenceHelper = (year, month, day) => 
{
  const daysUpToMonth = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ];
  const daysUpToMonthLeapYear = [ 0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335 ];

  if (isLeapYear(year))
  {
    year--;
    let numOfLeapsYear = Math.floor(year / 4 - year / 100 + year / 400);
    return year * 365 + numOfLeapsYear + daysUpToMonthLeapYear[month - 1] + day - 1;
  }
  else
  {
    year--;
    let numOfLeapsYear = Math.floor(year / 4 - year / 100 + year / 400);
    return year * 365 + numOfLeapsYear + daysUpToMonth[month - 1] + day - 1;
  }
}
const isLeapYear = (year) => {
  return (year % 4 == 0) && ( (year % 100 != 0) || (year % 400 == 0) );
}


const getFirstDayOfWeek = (startDate, days) => {
  let date = new Date(startDate.year, startDate.month - 1, startDate.day);
  let tempDate = {};
  let newDate = {};
  do {
    // set new date (for returning)
    newDate = {...tempDate}; 
    // test date one week after
    let temp = new Date(date.getTime() + (days * 24 * 60 * 60 * 1000)); // get date 1 week later
    tempDate.day = temp.getDate();
    tempDate.month = temp.getMonth() + 1;
    tempDate.year = temp.getFullYear();
    date = temp;
  } while (getDateDifference(tempDate, getDate()) >= 0);
  return newDate;
}
const getFirstDayOfMonth = () => {
  let date = new Date();
  return {
    day: 1,
    month: date.getMonth() + 1,
    year: date.getFullYear()
  }
}

const getMonthYearFromNum = (numStr) => {
  const [year, month] = numStr.split(' ');
  let monthString = '';
  switch (month) {
    case '1':
      monthString = 'January'; break;
    case '2':
      monthString = 'February'; break;
    case '3':
      monthString = 'March'; break;
    case '4':
      monthString = 'April'; break;
    case '5':
      monthString = 'May'; break;
    case '6':
      monthString = 'June'; break;
    case '7':
      monthString = 'July'; break;
    case '8':
      monthString = 'August'; break;
    case '9':
      monthString = 'September'; break;
    case '10':
      monthString = 'October'; break;
    case '11':
      monthString = 'November'; break;
    case '12':
      monthString = 'December'; break;
  }
  return `${monthString} ${year}`;
}


export { 
  getIncomeAfterTax, 
  getYearlyIncome, 
  getPercentOfIncome, 
  getBudgetAmountPerYear, 
  getTotalPercent,
  getBudgetAreaTotalUsed,
  getBudgetAreaTotalPerPeriod,
  getDate,
  getDateDifference,
  getFirstDayOfWeek,
  getFirstDayOfMonth,
  getMonthYearFromNum,
};