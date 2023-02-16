import { ICurrentOutcomeNew, IOutcome } from "../../@types";
import { formatDate } from "../../utils";

export const newCurrentOutcome = (): ICurrentOutcomeNew => ({
  transaction_type: 'current',
  description: '',
  amount: '',
  purchase_date: formatDate(new Date())
});

export const emptyCurrentOutcome = (): IOutcome => ({
  id: 0,
  balance_id: 0,
  transaction_type: 'current',
  amount: '0.0',
  description: '',
  purchase_date: formatDate(new Date())
});


// TBW
// const createEmptyOutcome = <T extends TransactionType>(type: T): EmptyOutcome<T> => {
//   const basicObj = {
//     id: 0,
//     balance_id: 0,
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