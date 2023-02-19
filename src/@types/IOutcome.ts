import { ITransaction } from "./ITransaction";

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
  purchase_date: string;
  quotas?: number;
}

// TBW
// type EmptyOutcome<T extends TransactionType> = T extends 'current' ? ICurrentOutcome : IFixedOutcome;