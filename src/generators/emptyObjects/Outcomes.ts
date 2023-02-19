import { IOutcome, TransactionType } from "../../@types";
import { formatDate } from "../../utils";

export const newOutcome = <T extends TransactionType>(type: T): IOutcome => {
  const newObj = {
    id: 0,
    transaction_type: type as TransactionType,
    description: '',
    purchase_date: formatDate(new Date()),
  };

  if (type === 'current') {
    return newObj as IOutcome;
  } else if (type === 'fixed') {
    return { ...newObj, quotas: 1 } as IOutcome;
  } else {
    throw new Error(`Unsupported type: ${type}`)
  }
};


// TBW
// const createEmptyOutcome = <T extends TransactionType>(type: T): EmptyOutcome<T> => {
//   const basicObj = {
//     id: 0,
//     transaction_type: type,
//     amount: '',
//     description: '',
//     purchase_date: ''
//   };

//   if (type === 'current') {
//     return basicObj as unknown as EmptyOutcome<T>;
//   } else if (type === 'fixed') {
//     return { ...basicObj, quotas: 0 } as EmptyOutcome<T>;
//   } else {
//     throw new Error(`Unsupported type: ${type}`);
//   }
// };