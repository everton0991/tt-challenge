'use client';

import { ERROR_MESSAGES } from '@/constants/ErrorMessages';
import React, { useState } from 'react';

interface Transaction {
  id: number;
  amount: number;
}

const PaymentDashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, amount: 50 },
    { id: 2, amount: 150 },
    { id: 3, amount: 200 },
  ]);

  const [target, setTarget] = useState<number | undefined>(undefined);
  const [transactionId, setTransactionId] = useState<number | undefined>(
    undefined
  );
  const [transactionAmount, setTransactionAmount] = useState<
    number | undefined
  >(undefined);
  const [result, setResultMessage] = useState<string>('');

  const total = transactions.reduce(
    (accumulator, current) => accumulator + current.amount,
    0
  );

  const handleCheckTransactions = () => {
    setResultMessage('');

    if (target === undefined || typeof target !== 'number') {
      setResultMessage(ERROR_MESSAGES.INVALID_TARGET);
      return;
    }

    if (target < 0) {
      setResultMessage(ERROR_MESSAGES.NEGATIVE_TARGET);
      return;
    }

    const amountsSet = new Set<number>();

    for (const transaction of transactions) {
      const complement = target - transaction.amount;

      if (amountsSet.has(complement)) {
        const matchingTransaction = transactions.find(
          (t) => t.amount === complement
        );

        if (matchingTransaction) {
          setResultMessage(
            `Transactions ${matchingTransaction.id} and ${transaction.id} add up to ${target}`
          );
          return;
        }
      }
      amountsSet.add(transaction.amount);
    }

    setResultMessage(ERROR_MESSAGES.NO_MATCHING_TRANSACTIONS);
  };

  const handleAddTransaction = (id?: number, amount?: number) => {
    if (id === undefined) {
      setResultMessage(ERROR_MESSAGES.NULL_ID);
      return;
    }

    if (amount === undefined || amount < 0) {
      setResultMessage(ERROR_MESSAGES.NULL_OR_NEGATIVE_AMOUNT);
      return;
    }

    if (transactions.some((transaction) => transaction.id === id)) {
      setResultMessage(ERROR_MESSAGES.ID_EXISTS(id));
      return;
    }

    setTransactions([...transactions, { id, amount }]);
    // Reset input fields after adding
    setTransactionId(undefined);
    setTransactionAmount(undefined);
  };

  console.log({ transactions });

  // TODO Add styling
  return (
    <div className='max-w-2xl mx-auto p-6 bg-gray-800 shadow-lg rounded-lg'>
      <h1 className='text-2xl font-bold mb-4 text-white text-center'>
        Payment Transaction Dashboard
      </h1>

      {/* Transactions List */}
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

      {/* Divider */}
      <hr className='border-gray-600 mb-4' />

      {/* Check transactions */}
      <h2 className='text-xl font-semibold text-white mb-2'>
        Check Transactions
      </h2>
      <div className='mb-4'>
        <input
          type='number'
          placeholder='Enter Target Amount'
          className='border border-gray-600 rounded p-2 w-full mb-2 bg-gray-700 text-white'
          onChange={(e) => setTarget(Number(e.target.value))}
        />
        <button
          onClick={handleCheckTransactions}
          className='w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-500 transition duration-200'
        >
          Check Transactions
        </button>
      </div>

      {/* Divider */}
      <hr className='border-gray-600 mb-4' />

      {/* Add New Transaction */}
      <h2 className='text-xl font-semibold text-white mb-2'>
        Add New Transaction
      </h2>
      <div className='mb-4'>
        <input
          type='number'
          placeholder='Enter Transaction ID'
          className='border border-gray-600 rounded p-2 w-full mb-2 bg-gray-700 text-white'
          onChange={(e) => setTransactionId(Number(e.target.value))}
        />
        <input
          type='number'
          placeholder='Enter Transaction Amount'
          className='border border-gray-600 rounded p-2 w-full mb-2 bg-gray-700 text-white'
          onChange={(e) => setTransactionAmount(Number(e.target.value))}
        />
        <button
          onClick={() => handleAddTransaction(transactionId, transactionAmount)}
          className='w-full bg-green-600 text-white rounded p-2 hover:bg-green-500 transition duration-200'
        >
          Add New Transaction
        </button>
      </div>

      {/* Result Message */}
      {result && (
        <div className='mt-4 text-center text-red-400'>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentDashboard;
