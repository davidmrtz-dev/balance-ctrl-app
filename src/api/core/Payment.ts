import * as Http from '../Http';
import { IPaymentData } from '../../@types';

export const getPayments = async ({
  limit,
  offset
}: {
  limit: number;
  offset: number;
}): Promise<IPaymentData> => {
  const result = await Http.get('/api/payments', { limit, offset }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || '',
  });

  return result.data;
};