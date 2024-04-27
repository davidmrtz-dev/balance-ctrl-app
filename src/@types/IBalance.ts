export interface IBalance {
  id: number;
  title: string;
  description: string;
  amount_incomes: string;
  amount_outcomes_current?: string;
  amount_outcomes_fixed?: string;
  amount_after_payments?: string;
  line_chart_data?: {[key: string]: string []};
  comparison_percentage: string;
  amount_paid: string;
  amount_to_be_paid: string;
  amount_for_payments: string;
  current_amount: string;
  'current?': boolean;
  month: number;
  year: number;
}

export interface IBalances {
  balances: IBalance [];
}
