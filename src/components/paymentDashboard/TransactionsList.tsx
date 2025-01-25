import React from 'react';

export interface Transaction {
  id: number;
  amount: number;
}

interface TransactionsListProps {
  transactions: Array<Transaction>;
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
}) => {
  const total = transactions.reduce(
    (accumulator, current) => accumulator + current.amount,
    0
  );

  return (
    <>
      <h2 className='text-xl font-semibold text-white mb-2'>
        Transactions List
      </h2>

      <ul className='mb-4'>
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className='flex justify-between items-center p-4 mb-2 border border-gray-600 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-200'
          >
            <span className='text-gray-300'>ID: {transaction.id}</span>
            <span className='text-gray-300'>Amount: ${transaction.amount}</span>
          </li>
        ))}

        <li className='flex justify-between items-center p-4 font-semibold text-gray-200 border border-gray-600 bg-gray-700 rounded-lg'>
          <span>Total:</span>
          <span>${total}</span>
        </li>
      </ul>
    </>
  );
};

export default TransactionsList;
