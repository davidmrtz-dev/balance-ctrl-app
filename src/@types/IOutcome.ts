import { ITransaction } from "./ITransaction";

export interface OutcomesHash { [key: number]: Outcomes };

export interface IOutcomes {
  outcomes: Outcomes;
  total_pages: number;
}

type Outcomes = ICurrentOutcome [] | IFixedOutcome [];

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