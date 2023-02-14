import { ITransaction } from "./ITransaction";

export interface OutcomesHash { [key: number]: Outcome [] };

export interface IOutcomes {
  outcomes: Outcome [];
  total_pages: number;
}

export type Outcome = ICurrentOutcome | IFixedOutcome;

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