export interface IPaymentData {
  current: IPayment [];
  fixed: IPayment [];
}

export interface IPayment {
  id: number;
  balance_id: number;
  obligation_type: string;
  charge_date: string;
  amount: string;
}