'use client';

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
  const [target, setTarget] = useState<number | null>(null);
  const [transactionId, setTransactionId] = useState<number | null>(null);
  const [transactionAmount, setTransactionAmount] = useState<number | null>(
    null
  );
  const [result, setResult] = useState<string>('');
  const total = transactions.reduce((accumulator, current) => {
    return accumulator + current.amount;
  }, 0);

  const handleCheckTransactions = () => {
    setResult('');

    if (!target || target === null || typeof target !== 'number') {
      setResult('Target is invalid.');
      return;
    }

    if (target < 0) {
      setResult('Target cannot be negative.');
      return;
    }

    // TODO - Refactor this
    for (let i = 0; i < transactions.length; i++) {
      for (let j = i + 1; j < transactions.length; j++) {
        if (transactions[i].amount + transactions[j].amount === target) {
          setResult(
            `Transactions ${transactions[i].id} and ${transactions[j].id} add up to ${target}`
          );
          return;
        }
      }
    }

    setResult('No matching transactions found.');
  };

  // TODO - Create new input for new transactions
  const handleAddTransaction = (id: number | null, amount: number | null) => {
    if (id === null) {
      return setResult('Parameter ID cannot be null.');
    }
    if (amount === null) {
      return setResult('Parameter Amount cannot be null.');
    }
    setTransactions([...transactions, { id, amount }]);
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
