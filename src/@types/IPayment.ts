import { IMeta } from ".";
import { IIncome } from "./IIncome";
import { IOutcome } from "./IOutcome";

export interface IPayment {
  id: number;
  amount: string;
  status: 'hold' | 'pending' | 'applied' | 'expired' | 'cancelled';
  payment_number?: string;
  refund_id?: null | number;
  paymentable?: IOutcome | IIncome;
};

export interface IPayments {
  payments: IPayment [];
  meta: IMeta;
  total_pages: number;
}
