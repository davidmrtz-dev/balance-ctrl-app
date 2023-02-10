export interface ICurrentPayments {
  current: IPayment [];
  current_total_pages: number;
}

export interface IFixedPayments {
  fixed: IPayment [];
  fixed_total_pages: number;
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

export interface PaymentsHash { [key: number]: IPayment[] };

export interface PaymentPages {
  current: number;
  fixed: number;
}