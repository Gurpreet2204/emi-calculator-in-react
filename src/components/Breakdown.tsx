import React, { useState, useRef } from 'react';
import { Printer } from 'lucide-react';

interface BreakdownProps {
  breakdown: {
    month: number;
    emi: number;
    interestPaid: number;
    principalPaid: number;
    remainingBalance: number;
  }[];
}

const Breakdown: React.FC<BreakdownProps> = ({ breakdown }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const printRef = useRef<HTMLDivElement>(null);

  if (!breakdown || breakdown.length === 0) {
    return <p className="text-center text-gray-600 dark:text-gray-400">No breakdown available.</p>;
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = breakdown.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handlePrint = () => {
    const printContent = document.createElement('div');
    printContent.innerHTML = `
      <style>
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
        th { background-color: #f2f2f2; }
        h2 { text-align: center; color: #333; }
      </style>
      <h2>EMI Breakdown</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>EMI</th>
            <th>Interest Paid</th>
            <th>Principal Paid</th>
            <th>Remaining Balance</th>
          </tr>
        </thead>
        <tbody>
          ${breakdown.map(entry => `
            <tr>
              <td>${entry.month}</td>
              <td>${formatCurrency(entry.emi)}</td>
              <td>${formatCurrency(entry.interestPaid)}</td>
              <td>${formatCurrency(entry.principalPaid)}</td>
              <td>${formatCurrency(entry.remainingBalance)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    const printWindow = window.open('', '_blank');
    printWindow?.document.write(printContent.innerHTML);
    printWindow?.document.close();
    printWindow?.print();
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md mt-8" ref={printRef}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">Monthly Payment Breakdown</h2>
        <button
          onClick={handlePrint}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Printer className="mr-2" size={18} />
          Print Breakdown
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Month</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">EMI</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Interest Paid</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Principal Paid</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Remaining Balance</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((entry) => (
              <tr key={entry.month} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">{entry.month}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">{formatCurrency(entry.emi)}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">{formatCurrency(entry.interestPaid)}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">{formatCurrency(entry.principalPaid)}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">{formatCurrency(entry.remainingBalance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(breakdown.length / itemsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === i + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Breakdown;