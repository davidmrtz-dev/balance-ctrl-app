export interface ITransaction {
  id: number;
  transaction_type: TransactionType;
  amount: string;
  description: string;
  purchase_date: string;
}

export type TransactionType = 'current' | 'fixed';