import { ITransaction, TransactionType } from "./ITransaction";

export interface OutcomesHash { [key: number]: IOutcome [] };

export interface IOutcomes {
  outcomes: IOutcome [];
  total_pages: number;
}

export type IOutcome = ICurrentOutcome | IFixedOutcome;

export interface ICurrentOutcome extends ITransaction {
  transaction_type: 'current';
  purchase_date: string;
}

export interface IFixedOutcome extends ITransaction {
  transaction_type: 'fixed',
  purchase_date: string;
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
  purchase_date: any
}

export const newOutcome = (type: TransactionType): IOutcomeNew => ({
  transaction_type: type,
  description: '',
  amount: '',
  purchase_date: ''
});