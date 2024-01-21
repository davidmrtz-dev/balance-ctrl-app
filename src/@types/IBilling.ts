type BillingType = 'credit' | 'debit' | 'cash' | '';

export interface IBilling {
  id: number;
  name: string;
  cycle_end_date: string | null;
  payment_due_date: string | null;
  billing_type: BillingType;
  credit_card_number: string;
};

export interface IBillings {
  billings: IBilling [];
};
