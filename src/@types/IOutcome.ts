import { ITransaction, IPayment, ICategory, IBilling } from "./";

export interface IOutcome extends ITransaction {
  operation_type: 'outcome';
  quotas?: number;
  billings: IBilling [];
  payments: IPayment [];
  categories: ICategory [];
  status: 'expired' | 'pending' | 'hold' | 'paid' | 'ok' | 'unknown' | 'cancelled';
}

export interface IOutcomes {
  outcomes: IOutcome [];
  total_pages: number;
}

export interface OutcomesHash { [key: number]: IOutcome [] };
