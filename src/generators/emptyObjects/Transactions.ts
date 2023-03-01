import { IOutcome, IIncome, TransactionType } from "../../@types";
import dayjs from 'dayjs';

export const newOutcome = <T extends TransactionType>(type: T): IOutcome => {
  const newObj = {
    id: 0,
    transaction_type: type as TransactionType,
    description: '',
    purchase_date: dayjs().format('YYYY-MM-DD'),
    amount: '1'
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
    frequency: '0',
    amount: '1'
  };

  if (type === 'current') {
    return newObj as IIncome;
  } else if (type === 'fixed') {
    return { ...newObj, frequency: '0' } as IIncome;
  } else {
    throw new Error(`Unsupported type: ${type}`);
  }
};