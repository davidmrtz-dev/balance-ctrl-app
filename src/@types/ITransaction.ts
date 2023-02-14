export interface ITransaction {
  id: number;
  balance_id: number;
  transaction_type: TransactionType;
  amount: string;
  description: string;
}

export type TransactionType = 'current' | 'fixed';