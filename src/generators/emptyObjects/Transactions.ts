import { IOutcome, IIncome, TransactionType } from "../../@types";

export const newOutcome = <T extends TransactionType>(type: T): IOutcome => {
  const newObj = {
    id: 0,
    transaction_type: type as TransactionType,
    description: '',
    transaction_date: '',
    amount: '1',
    categories: [],
    payments: [],
    status: 'unknown',
    billings: [],
    operation_type: 'outcome'
  };

  if (type === 'current') {
    return newObj as IOutcome;
  } else if (type === 'fixed') {
    return { ...newObj, quotas: 3 } as IOutcome;
  } else {
    throw new Error(`Unsupported type: ${type}`);
  }
};

export const newIncome = <T extends TransactionType>(type: T): IIncome => {
  const newObj = {
    id: 0,
    transaction_type: type as TransactionType,
    description: '',
    amount: '1'
  };

  if (type === 'current') {
    return newObj as IIncome;
  } else if (type === 'fixed') {
    return { ...newObj, frequency: 'monthly' } as IIncome;
  } else {
    throw new Error(`Unsupported type: ${type}`);
  }
};
