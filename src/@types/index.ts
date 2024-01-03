export type { IUser, Login } from './IUser';
export type { IBalance } from './IBalance';
export type { ITransaction, TransactionType } from './ITransaction';
export type {
  IOutcome,
  IOutcomes,
  OutcomesHash
} from './IOutcome';
export type {
  IIncome,
  IIncomes
} from './IIncome';
export type { IPayment, IPayments, PaymentsHash } from './IPayment';
export type { IBilling } from './IBilling';

export type ICategory = {
  id: number;
  name: string;
  'discarded?'?: boolean;
};

export interface IMeta {
  current_page: number;
  per_page: number;
  total_pages: number;
  total_per_page: number;
}
