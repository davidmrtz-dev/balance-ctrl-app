import { ITransaction } from "./ITransaction";

export interface IOutcomes {
  outcomes: ITransaction [];
  total_pages: number;
}

export interface OutcomesHash { [key: number]: ITransaction [] };

export interface OutcomesPagination {
  current: number;
  fixed: number;
}