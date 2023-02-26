export interface ITransaction {
  id: number;
  amount: string;
  description: string;
  purchase_date: string;
  quotas?: number;
  frequency?: string;
}

interface IBaseTransaction {
  id: number;
  amount: string;
  description: string;
  purchase_date: string;
  quotas?: number;
  frequency?: string;
}

export interface IFixedTransaction extends IBaseTransaction {
  transaction_type: 'fixed'
}

export interface ICurrentTransaction extends IBaseTransaction {
  transaction_type: 'current'
}

export type IITransaction = IFixedTransaction | ICurrentTransaction; 

export type TransactionType = 'current' | 'fixed';