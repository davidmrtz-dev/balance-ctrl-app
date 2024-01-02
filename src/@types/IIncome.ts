import { ITransaction } from "./ITransaction";

export interface IIncome extends ITransaction {
  frequency?: string;
}
export interface IIncomes {
  incomes: IIncome [];
}
