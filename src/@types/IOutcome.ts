import { ITransaction, IPayment, ICategory, IBilling } from "./";

export interface IOutcome extends ITransaction {
  quotas?: number;
  billings: IBilling [];
  payments: IPayment [];
  categories: ICategory [];
  status: 'expired' | 'pending' | 'hold' | 'paid' | 'ok' | 'unknown' | 'cancelled';
}

export interface IMeta {
  current_page: number;
  per_page: number;
  total_pages: number;
  total_per_page: number;
}

export interface IOutcomes {
  outcomes: IOutcome [];
  meta: IMeta;
  total_pages: number;
}

export interface OutcomesHash { [key: number]: IOutcome [] };
