import { Dayjs } from "dayjs";
import { IMeta } from ".";
import { IIncome } from "./IIncome";
import { IOutcome } from "./IOutcome";

export type PaymentStatus = 'hold' | 'pending' | 'applied' | 'expired' | 'refund';
export interface IPayment {
  id: number;
  amount: string;
  status: PaymentStatus;
  payment_number?: string;
  refund_id?: null | number;
  paymentable?: IOutcome | IIncome;
  paid_at: string | Dayjs;
};

export interface IPayments {
  payments: IPayment [];
  meta: IMeta;
  total_pages: number;
}

export interface PaymentsHash { [key: number]: IPayment [] };
