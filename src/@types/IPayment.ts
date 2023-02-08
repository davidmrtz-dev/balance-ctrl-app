export interface IPaymentData {
  current: IPayment [];
  fixed: IPayment [];
}

export interface IPayment {
  id: number;
  title: string;
  description: string;
  balance_id: number;
  obligation_type: string;
  charge_date: string;
  amount: string;
}