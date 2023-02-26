import { ITransaction, TransactionType } from "../../@types";
import dayjs from 'dayjs';

export const newOutcome = <T extends TransactionType>(type: T): ITransaction => {
  const newObj = {
    id: 0,
    transaction_type: type as TransactionType,
    description: '',
    purchase_date: dayjs().format('YYYY-MM-DD'),
    amount: '1'
  };

  if (type === 'current') {
    return newObj as ITransaction;
  } else if (type === 'fixed') {
    return { ...newObj, quotas: 3 } as ITransaction;
  } else {
    throw new Error(`Unsupported type: ${type}`)
  }
};