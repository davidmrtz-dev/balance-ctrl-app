export type OperationType = 'income' | 'outcome';

export type TransactionType = 'current' | 'fixed';

export interface ITransaction {
  id: number;
  amount: string;
  description: string;
  transaction_type: TransactionType;
  operation_type : OperationType;
  purchase_date?: string;
  quotas?: number;
  frequency?: string;
}

export interface IIncome extends ITransaction {
  operation_type: 'income';
}

export interface IOutcome extends ITransaction {
  operation_type: 'outcome';
}