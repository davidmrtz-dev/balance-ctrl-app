import * as Http from '../Http';
import { IPaymentData } from '../../@types';

export const getPayments = async (): Promise<IPaymentData> => {
  const result = await Http.get('/api/payments');
  return result.data;
};