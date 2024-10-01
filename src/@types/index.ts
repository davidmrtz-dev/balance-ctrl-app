export type { IUser, Login } from './IUser';
export type { IBalance, IBalances } from './IBalance';
export type { ITransaction, TransactionType } from './ITransaction';
export type {
  IOutcome,
  IOutcomes,
  OutcomesHash,
  OutcomeStatus
} from './IOutcome';
export type {
  IIncome,
  IIncomes
} from './IIncome';
export type {
  IPayment,
  IPayments,
  PaymentsHash,
  PaymentStatus
} from './IPayment';
export type { IBilling, IBillings } from './IBilling';
export type { ICategory, ICategories } from './ICategory';
export type { IOnboardingConfig } from './IOnboarding';
export interface IMeta {
  current_page: number;
  per_page: number;
  total_pages: number;
  total_per_page: number;
}

export type Variation = 'blue' | 'yellow' | 'gray' | 'green' | 'red' | 'lightRed' | 'orange' | 'lightOrange';
