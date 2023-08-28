import { ITransaction } from "./ITransaction";

export interface IIncome extends ITransaction {
  operation_type: 'income';
  frequency?: string;
}
export interface IIncomes {
  incomes: IIncome [];
}
