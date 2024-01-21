export interface IBalance {
  id: number;
  title: string;
  description: string;
  amount_incomes: string;
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
