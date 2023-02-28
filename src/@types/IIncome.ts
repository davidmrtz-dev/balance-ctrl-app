import { ITransaction } from "./ITransaction";

export interface IIncome extends ITransaction {
  operation_type: 'income';
}
export interface IIncomes {
  incomes: IIncome [];
}