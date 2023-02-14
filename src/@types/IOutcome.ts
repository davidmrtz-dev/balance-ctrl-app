export interface IOutcomes {
  outcomes: IOutcome [];
  total_pages: number;
}

export interface IOutcome {
  id: number;
  title: string;
  description: string;
  balance_id: number;
  obligation_type: string;
  charge_date: string;
  amount: string;
}

export type OutcomeType = 'current' | 'fixed';

export interface OutcomesHash { [key: number]: IOutcome[] };

export interface OutcomePages {
  current: number;
  fixed: number;
}