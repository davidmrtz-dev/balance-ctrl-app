import { Dayjs } from "dayjs";

type OperationType = 'income' | 'outcome';

export type TransactionType = 'current' | 'fixed';

export interface ITransaction {
  id: number;
  amount: string;
  description: string;
  transaction_type: TransactionType;
  operation_type : OperationType;
  transaction_date?: string | Dayjs;
  quotas?: number;
  frequency?: string;
}
