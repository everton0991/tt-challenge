import React from 'react';

interface CheckTransactionFormProps {
  target: number | undefined;
  setTarget: (target: number) => void;
  handleCheckTransactions: () => void;
}

const CheckTransactionForm: React.FC<CheckTransactionFormProps> = ({
  target,
  setTarget,
  handleCheckTransactions,
}) => {
  return (
    <>
      <h2 className='text-xl font-semibold text-white mb-2'>
        Check Transactions
      </h2>
      <div className='mb-4'>
        <input
          type='number'
          placeholder='Enter Target Amount'
          className='border border-gray-600 rounded p-2 w-full mb-2 bg-gray-700 text-white'
          value={target || ''}
          onChange={(e) => setTarget(Number(e.target.value))}
        />
        <button
          onClick={handleCheckTransactions}
          disabled={!target}
          className='w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-500 transition duration-200 disabled:opacity-60'
        >
          Check Transactions
        </button>
      </div>
    </>
  );
};

export default CheckTransactionForm;
