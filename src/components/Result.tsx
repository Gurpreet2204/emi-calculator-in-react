import React from "react";

interface ResultProps {
  emi: number;
  totalPayableAmount: number;
  totalInterest: number;
}

const Result: React.FC<ResultProps> = ({
  emi,
  totalInterest,
  totalPayableAmount,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 mt-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
        EMI Calculation Summary
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="font-medium">Monthly EMI:</span>
          <span className="font-semibold text-gray-800 dark:text-gray-300">
            {formatCurrency(emi)}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="font-medium">Total Payable Amount:</span>
          <span className="font-semibold text-gray-800 dark:text-gray-300">
            {formatCurrency(totalPayableAmount)}
          </span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="font-medium">Total Interest Payable:</span>
          <span className="font-semibold text-gray-800 dark:text-gray-300">
            {formatCurrency(totalInterest)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Result;
