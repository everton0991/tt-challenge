import React from 'react';

interface AddNewTransactionFormProps {
  transactionId: number | undefined;
  transactionAmount: number | undefined;
  setTransactionId: (id: number) => void;
  setTransactionAmount: (amount: number) => void;
  handleAddTransaction: (id?: number, amount?: number) => void;
}

const AddNewTransactionForm: React.FC<AddNewTransactionFormProps> = ({
  transactionId,
  transactionAmount,
  setTransactionId,
  setTransactionAmount,
  handleAddTransaction,
}) => {
  return (
    <>
      <h2 className='text-xl font-semibold text-white mb-2'>
        Add New Transaction
      </h2>
      <div className='mb-4'>
        <input
          type='number'
          placeholder='Enter Transaction ID'
          className='border border-gray-600 rounded p-2 w-full mb-2 bg-gray-700 text-white'
          value={transactionId || ''}
          onChange={(e) => setTransactionId(Number(e.target.value))}
        />
        <input
          type='number'
          placeholder='Enter Transaction Amount'
          className='border border-gray-600 rounded p-2 w-full mb-2 bg-gray-700 text-white'
          value={transactionAmount || ''}
          onChange={(e) => setTransactionAmount(Number(e.target.value))}
        />
        <button
          onClick={() => handleAddTransaction(transactionId, transactionAmount)}
          disabled={!transactionId || !transactionAmount}
          className='w-full bg-green-600 text-white rounded p-2 hover:bg-green-500 transition duration-200 disabled:opacity-60'
        >
          Add New Transaction
        </button>
      </div>
    </>
  );
};

export default AddNewTransactionForm;
