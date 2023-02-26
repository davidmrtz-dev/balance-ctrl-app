import { ITransaction } from "./ITransaction";

// export interface ICurentIncome extends ITransaction {
//   transaction_type: 'current';
// }

// export interface IFixedIncome extends ITransaction {
//   transaction_type: 'fixed';
// }

// export type IIncome = ICurentIncome | IFixedIncome;

export interface IIncomes {
  incomes: ITransaction [];
}