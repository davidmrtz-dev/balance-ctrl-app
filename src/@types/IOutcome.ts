import { ITransaction } from "./ITransaction";

// export interface ICurrentOutcome extends ITransaction {
//   transaction_type: 'current';
// }

// export interface IFixedOutcome extends ITransaction {
//   transaction_type: 'fixed';
// }

// export type IOutcome = ICurrentOutcome | IFixedOutcome;

export interface IOutcomes {
  outcomes: ITransaction [];
  total_pages: number;
}

export interface OutcomesHash { [key: number]: ITransaction [] };

export interface OutcomesPagination {
  current: number;
  fixed: number;
}