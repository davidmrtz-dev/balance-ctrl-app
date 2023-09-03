import { ITransaction, IPayment, ICategory } from "./";

export interface IOutcome extends ITransaction {
  operation_type: 'outcome';
  quotas?: number;
  payments: IPayment [];
  categories: ICategory [];
}

export interface IOutcomes {
  outcomes: IOutcome [];
  total_pages: number;
}

export interface OutcomesHash { [key: number]: IOutcome [] };

export interface OutcomesPagination {
  current: number;
  fixed: number;
}
