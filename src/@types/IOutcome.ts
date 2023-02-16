import { ITransaction, TransactionType } from "./ITransaction";

export interface OutcomesHash { [key: number]: IOutcome [] };

export interface IOutcomes {
  outcomes: IOutcome [];
  total_pages: number;
}

export type IOutcome = ICurrentOutcome | IFixedOutcome;

export interface ICurrentOutcome extends ITransaction {
  transaction_type: 'current';
}

export interface IFixedOutcome extends ITransaction {
  transaction_type: 'fixed',
  quotas: number;
}

export interface OutcomesPagination {
  current: number;
  fixed: number;
}

export type IOutcomeNew = {
  transaction_type: string,
  description: string,
  amount: string,
  purchase_date: Date | string;
}

export const newCurrentOutcome = (type: TransactionType): IOutcomeNew => ({
  transaction_type: type,
  description: '',
  amount: '',
  purchase_date: new Date()
});

// export const emptyOutcome

// type EmptyOutcome<T extends TransactionType> = T extends 'current' ? ICurrentOutcome : IFixedOutcome;

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