import { ITransaction } from "./ITransaction";

export interface ICurrentOutcome extends ITransaction {
  transaction_type: 'current';
}

export interface IFixedOutcome extends ITransaction {
  transaction_type: 'fixed',
  quotas: number;
}

export type IOutcome = ICurrentOutcome | IFixedOutcome;

export interface IOutcomes {
  outcomes: IOutcome [];
  total_pages: number;
}

export interface OutcomesHash { [key: number]: IOutcome [] };

export interface OutcomesPagination {
  current: number;
  fixed: number;
}