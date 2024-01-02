import { ITransaction } from "./ITransaction";

export interface IIncome extends ITransaction {
  frequency: string | null;
}
export interface IIncomes {
  incomes: IIncome [];
}
