import { IOutcome, TransactionType } from "../../@types";
import { formatDate } from "../../utils";

export const newOutcome = <T extends TransactionType>(type: T): IOutcome => {
  const newObj = {
    id: 0,
    transaction_type: type as TransactionType,
    description: '',
    purchase_date: formatDate(new Date()),
    amount: '1'
  };

  if (type === 'current') {
    return newObj as IOutcome;
  } else if (type === 'fixed') {
    return { ...newObj, quotas: 3 } as IOutcome;
  } else {
    throw new Error(`Unsupported type: ${type}`)
  }
};