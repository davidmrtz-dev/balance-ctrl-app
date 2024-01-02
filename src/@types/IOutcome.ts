import { ITransaction, IPayment, ICategory, IBilling, IMeta } from ".";

export interface IOutcome extends ITransaction {
  quotas: number | null;
  billings: IBilling [];
  payments: IPayment [];
  categories: ICategory [];
  status: 'expired' | 'pending' | 'hold' | 'paid' | 'ok' | 'unknown' | 'cancelled';
}

export interface IOutcomes {
  outcomes: IOutcome [];
  meta: IMeta;
  total_pages: number;
}

export interface OutcomesHash { [key: number]: IOutcome [] };
