'use client';

import { ERROR_MESSAGES } from '@/constants/ErrorMessages';
import React, { useState } from 'react';
import TransactionsList, {
  Transaction,
} from './paymentDashboard/TransactionsList';
import CheckTransactionForm from './paymentDashboard/CheckTransactionForm';
import AddNewTransactionForm from './paymentDashboard/AddNewTransactionForm';

const PaymentDashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Array<Transaction>>([
    { id: 1, amount: 50 },
    { id: 2, amount: 150 },
    { id: 3, amount: 200 },
  ]);

  const [target, setTarget] = useState<number | undefined>(0);
  const [transactionId, setTransactionId] = useState<number | undefined>(0);
  const [transactionAmount, setTransactionAmount] = useState<
    number | undefined
  >(0);
  const [result, setResultMessage] = useState<string>('');

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

  return (
    <div className='max-w-2xl mx-auto p-6 bg-gray-800 shadow-lg rounded-lg'>
      <h1 className='text-2xl font-bold mb-4 text-white text-center'>
        Payment Transaction Dashboard
      </h1>

      <TransactionsList transactions={transactions} />

      {/* Divider */}
      <hr className='border-gray-600 mb-4' />
      <CheckTransactionForm
        target={target}
        setTarget={setTarget}
        handleCheckTransactions={handleCheckTransactions}
      />

      {/* Divider */}
      <hr className='border-gray-600 mb-4' />
      <AddNewTransactionForm
        transactionId={transactionId}
        transactionAmount={transactionAmount}
        setTransactionId={setTransactionId}
        setTransactionAmount={setTransactionAmount}
        handleAddTransaction={handleAddTransaction}
      />

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
