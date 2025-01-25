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
    <div>
      <h1>Payment Transaction Dashboard</h1>

      {/* Transactions List */}
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            ID: {transaction.id}, Amount: ${transaction.amount}
          </li>
        ))}

        <li>Total: ${total}</li>
      </ul>

      {/* Check transactions */}
      <div>
        <input
          type='number'
          name='amount-to-check'
          placeholder='Enter Target Amount'
          className='text-black'
          onChange={(e) => setTarget(Number(e.target.value))}
        />
        <button onClick={handleCheckTransactions}>Check Transactions</button>
      </div>

      {/* add New Transaction */}
      <div>
        <input
          type='number'
          name='transaction-id'
          placeholder='Enter Transaction ID'
          className='text-black'
          onChange={(e) => setTransactionId(Number(e.target.value))}
        />
        <input
          type='number'
          name='transaction-amount'
          placeholder='Enter Transaction Amount'
          className='text-black'
          onChange={(e) => setTransactionAmount(Number(e.target.value))}
        />
        <button
          onClick={() => handleAddTransaction(transactionId, transactionAmount)}
        >
          Add New Transaction
        </button>
      </div>

      <div>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default PaymentDashboard;
