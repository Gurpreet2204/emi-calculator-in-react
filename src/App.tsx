import React, { useState, useEffect } from "react";
import LoanForm from "./components/LoanForm";
import Result from "./components/Result";
import Breakdown from "./components/Breakdown";
import { EMILogic } from "./logic/Logic";
import "./index.css";

interface EMIResult {
  emi: number;
  totalPayableAmount: number;
  totalInterest: number;
  breakdown: {
    month: number;
    emi: number;
    interestPaid: number;
    principalPaid: number;
    remainingBalance: number;
  }[];
}

const App: React.FC = () => {
  const [emiResult, setEmiResult] = useState<EMIResult | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleFormSubmit = (loanAmount: number, interestRate: number, loanTenure: number, prepayment?: number) => {
    try {
      const result = EMILogic(loanAmount, interestRate, loanTenure, prepayment);
      setEmiResult(result);
    } catch (error) {
      console.error("Error calculating EMI:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-4 right-4 p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded"
      >
        Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
      <h1 className="text-4xl font-bold mb-6 content-center text-center pt-6">EMI Calculator</h1>
      <LoanForm onSubmit={handleFormSubmit} />
      {emiResult && (
        <div>
          <Result
            emi={emiResult.emi}
            totalPayableAmount={emiResult.totalPayableAmount}
            totalInterest={emiResult.totalInterest}
          />
          <Breakdown breakdown={emiResult.breakdown} />
        </div>
      )}
    </div>
  );
};

export default App;