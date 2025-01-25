'use client';

import { ERROR_MESSAGES } from '@/constants/ErrorMessages';
import React, { useState } from 'react';
import TransactionsList, {
  Transaction,
} from './paymentDashboard/TransactionsList';
import CheckTransactionForm from './paymentDashboard/CheckTransactionForm';
import AddNewTransactionForm from './paymentDashboard/AddNewTransactionForm';

interface ResultMessage {
  error: boolean;
  message: string;
}

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
  const [resultMessage, setMessage] = useState<ResultMessage>({
    error: false,
    message: '',
  });

  const handleCheckTransactions = () => {
    setMessage({ error: false, message: '' });

    if (target === undefined || typeof target !== 'number') {
      setMessage({ error: true, message: ERROR_MESSAGES.INVALID_TARGET });
      return;
    }

    if (target < 0) {
      setMessage({ error: true, message: ERROR_MESSAGES.NEGATIVE_TARGET });
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
          setMessage({
            error: false,
            message: `Transactions ${matchingTransaction.id} and ${transaction.id} add up to ${target}`,
          });
          return;
        }
      }
      amountsSet.add(transaction.amount);
    }

    setMessage({
      error: true,
      message: ERROR_MESSAGES.NO_MATCHING_TRANSACTIONS,
    });
  };

  const handleAddTransaction = (id?: number, amount?: number) => {
    setMessage({ error: false, message: '' });

    if (id === undefined) {
      setMessage({ error: true, message: ERROR_MESSAGES.NULL_ID });
      return;
    }

    if (amount === undefined || amount < 0) {
      setMessage({
        error: true,
        message: ERROR_MESSAGES.NULL_OR_NEGATIVE_AMOUNT,
      });
      return;
    }

    if (transactions.some((transaction) => transaction.id === id)) {
      setMessage({ error: true, message: ERROR_MESSAGES.ID_EXISTS(id) });
      return;
    }

    setTransactions([...transactions, { id, amount }]);
    setTransactionId(undefined);
    setTransactionAmount(undefined);
  };

  return (
    <div className='max-w-5xl mx-auto p-6 bg-gray-800 shadow-lg rounded-lg'>
      <h1 className='text-2xl font-bold mb-8 text-white text-center'>
        Payment Transaction Dashboard
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='col-span-1'>
          <TransactionsList transactions={transactions} />
        </div>

        <div className='col-span-1'>
          <div className='mb-4'>
            <CheckTransactionForm
              target={target}
              setTarget={setTarget}
              handleCheckTransactions={handleCheckTransactions}
            />
          </div>

          <hr className='border-gray-600 mb-4' />

          <div className='mb-4'>
            <AddNewTransactionForm
              transactionId={transactionId}
              transactionAmount={transactionAmount}
              setTransactionId={setTransactionId}
              setTransactionAmount={setTransactionAmount}
              handleAddTransaction={handleAddTransaction}
            />
          </div>
        </div>
      </div>

      {resultMessage.message && (
        <div
          className={`mt-4 text-center ${
            resultMessage.error ? 'text-red-400' : 'text-green-400'
          }`}
        >
          <p>{resultMessage.message}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentDashboard;
