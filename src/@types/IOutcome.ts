import { ITransaction } from "./ITransaction";

export interface IOutcomes {
  outcomes: IOutcome [];
  total_pages: number;
}

export interface IOutcome extends ITransaction {}

export type OutcomeType = 'current' | 'fixed';

export interface OutcomesHash { [key: number]: IOutcome[] };

export interface OutcomePages {
  current: number;
  fixed: number;
}