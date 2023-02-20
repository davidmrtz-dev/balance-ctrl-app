export interface ITransaction {
  id: number;
  amount: string;
  description: string;
  purchase_date: string;
  quotas?: number;
}

export type TransactionType = 'current' | 'fixed';