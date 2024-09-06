import React, { useState } from "react";

interface FormProps {
  onSubmit: (
    loanAmount: number,
    interestRate: number,
    loanTenure: number,
    prePayment?: number
  ) => void;
}

const LoanForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTenure, setLoanTenure] = useState<string>("");
  const [prePayment, setPrePayment] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!loanAmount || isNaN(Number(loanAmount)) || Number(loanAmount) <= 0) {
      newErrors.loanAmount = "Please enter a valid loan amount";
    }

    if (!interestRate || isNaN(Number(interestRate)) || Number(interestRate) < 0 || Number(interestRate) > 100) {
      newErrors.interestRate = "Please enter a valid interest rate between 0 and 100";
    }

    if (!loanTenure || isNaN(Number(loanTenure)) || Number(loanTenure) <= 0 || !Number.isInteger(Number(loanTenure))) {
      newErrors.loanTenure = "Please enter a valid loan tenure in whole months";
    }

    if (prePayment && (isNaN(Number(prePayment)) || Number(prePayment) < 0)) {
      newErrors.prePayment = "Please enter a valid prepayment amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(
        Number(loanAmount),
        Number(interestRate),
        Number(loanTenure),
        prePayment ? Number(prePayment) : undefined
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Loan Details</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Loan Amount:
          </label>
          <input
            id="loanAmount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.loanAmount ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.loanAmount && <p className="text-red-500 text-sm mt-1">{errors.loanAmount}</p>}
        </div>
        <div>
          <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Interest Rate (%):
          </label>
          <input
            id="interestRate"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.interestRate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.interestRate && <p className="text-red-500 text-sm mt-1">{errors.interestRate}</p>}
        </div>
        <div>
          <label htmlFor="loanTenure" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Loan Tenure (in months):
          </label>
          <input
            id="loanTenure"
            type="number"
            value={loanTenure}
            onChange={(e) => setLoanTenure(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.loanTenure ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.loanTenure && <p className="text-red-500 text-sm mt-1">{errors.loanTenure}</p>}
        </div>
        <div>
          <label htmlFor="prePayment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Prepayment Amount (if any):
          </label>
          <input
            id="prePayment"
            type="number"
            value={prePayment}
            onChange={(e) => setPrePayment(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.prePayment ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.prePayment && <p className="text-red-500 text-sm mt-1">{errors.prePayment}</p>}
        </div>
      </div>
      <button
        type="submit"
        className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Calculate EMI
      </button>
      {Object.keys(errors).length > 0 && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
         Please enter the correct values.
        </div>
      )}
    </form>
  );
};

export default LoanForm;