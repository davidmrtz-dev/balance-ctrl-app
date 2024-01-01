import { Dayjs } from "dayjs";

export type TransactionType = 'current' | 'fixed';

export interface ITransaction {
  id: number;
  amount: string;
  description: string;
  transaction_type: TransactionType;
  transaction_date: string | Dayjs;
}
