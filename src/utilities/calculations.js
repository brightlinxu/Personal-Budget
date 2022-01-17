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


export { 
  getIncomeAfterTax, 
  getYearlyIncome, 
  getPercentOfIncome, 
  getBudgetAmountPerYear, 
  getTotalPercent,
  getBudgetAreaTotalUsed,
  getBudgetAreaTotalPerPeriod
};