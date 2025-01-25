// Error messages as constants
export const ERROR_MESSAGES = {
  INVALID_TARGET: 'Target is invalid.',
  NEGATIVE_TARGET: 'Target cannot be negative.',
  NULL_ID: 'Parameter ID cannot be null.',
  NULL_OR_NEGATIVE_AMOUNT: 'Amount cannot be null or negative.',
  ID_EXISTS: (id: number | string) =>
    `Transaction with ID ${id} already exists.`,
  NO_MATCHING_TRANSACTIONS: 'No matching transactions found.',
};
