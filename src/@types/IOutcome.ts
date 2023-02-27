import { ITransaction } from "./ITransaction";

export interface IOutcome extends ITransaction {
  operation_type: 'outcome';
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