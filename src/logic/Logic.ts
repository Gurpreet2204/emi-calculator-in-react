export const EMILogic = (
  loanAmount: number,
  annualInterestRate: number,
  loanTenureMonths: number,
  prepayment: number = 0
) => {
  if (loanAmount <= 0 || loanAmount > 1e12) {
    throw new Error(
      `Invalid loan amount: ${loanAmount}. Should be between 0 and 1,000,000,000,000.`
    );
  }
  if (annualInterestRate < 0 || annualInterestRate > 100) {
    throw new Error(
      `Invalid annual interest rate: ${annualInterestRate}. Should be between 0 and 100.`
    );
  }
  if (loanTenureMonths <= 0 || loanTenureMonths > 1200) {
    throw new Error(
      `Invalid loan tenure: ${loanTenureMonths}. Should be between 1 and 1200 months.`
    );
  }

  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const n = loanTenureMonths;

  let emi: number;
  if (monthlyInterestRate === 0) {
    emi = loanAmount / n;
  } else {
    const factor = Math.pow(1 + monthlyInterestRate, n);
    emi = (loanAmount * monthlyInterestRate * factor) / (factor - 1);
  }

  if (isNaN(emi) || !isFinite(emi)) {
    throw new Error(`Error in EMI calculation. EMI value: ${emi}`);
  }

  let totalPayableAmount = 0;
  let totalInterest = 0;
  const breakdown: {
    month: number;
    emi: number;
    interestPaid: number;
    principalPaid: number;
    remainingBalance: number;
    prepaymentApplied: number;
  }[] = [];

  let remainingBalance = loanAmount;

  for (let i = 1; i <= n; i++) {
    const interestPaid = remainingBalance * monthlyInterestRate;
    let principalPaid = emi - interestPaid;

    if (principalPaid > remainingBalance) {
      principalPaid = remainingBalance;
    }

    const currentEmi = principalPaid + interestPaid;
    remainingBalance -= principalPaid;

    if (prepayment > 0 && remainingBalance > 0) {
      const actualPrepayment = Math.min(prepayment, remainingBalance);
      remainingBalance -= actualPrepayment;
      totalPayableAmount += actualPrepayment;
      prepayment = 0;
    }

    totalPayableAmount += currentEmi;
    totalInterest += interestPaid;

    breakdown.push({
      month: i,
      emi: currentEmi,
      interestPaid,
      principalPaid,
      remainingBalance,
      prepaymentApplied: i === 1 ? Math.min(prepayment, loanAmount) : 0,
    });

    if (remainingBalance <= 0) {
      break;
    }
  }

  return {
    emi,
    totalPayableAmount,
    totalInterest,
    breakdown,
  };
};
