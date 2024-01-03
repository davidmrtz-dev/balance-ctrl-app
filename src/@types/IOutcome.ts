import { ITransaction, IPayment, ICategory, IBilling, IMeta } from ".";

export type OutcomeStatus = 'expired' | 'pending' | 'hold' | 'paid' | 'ok' | 'unknown';

export interface IOutcome extends ITransaction {
  quotas: number | null;
  billings: IBilling [];
  payments: IPayment [];
  categories: ICategory [];
  status: OutcomeStatus;
}

export interface IOutcomes {
  outcomes: IOutcome [];
  meta: IMeta;
  total_pages: number;
}

export interface OutcomesHash { [key: number]: IOutcome [] };
