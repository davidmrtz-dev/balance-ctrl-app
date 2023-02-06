import * as Http from '../Http';
import { IPaymentData } from '../../@types';

export const getPayments = async (): Promise<IPaymentData> => {
  const result = await Http.get('/api/payments', {}, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || '',
  });

  return result.data;
};