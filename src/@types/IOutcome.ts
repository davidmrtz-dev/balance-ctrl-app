import { ITransaction } from "./ITransaction";

export interface IOutcomes {
  outcomes: ICurrentOutcome [];
  total_pages: number;
}

export interface ICurrentOutcome extends ITransaction {
  transaction_type: 'fixed';
  purchase_date: string;
}

export interface OutcomesHash { [key: number]: ICurrentOutcome[] };

export interface OutcomePages {
  current: number;
  fixed: number;
}