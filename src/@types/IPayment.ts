export interface IPayment {
  id: number;
  amount: string;
  status: 'hold' | 'pending' | 'applied' | 'expired' | 'cancelled';
};
