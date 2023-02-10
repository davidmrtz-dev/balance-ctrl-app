import * as Http from '../Http';
import { IPaymentCurrent } from '../../@types/IPayment';

export const getCurrentPayments = async ({
  limit,
  offset
}: {
  limit: number;
  offset: number;
}): Promise<IPaymentCurrent> => {
  const result = await Http.get('/api/payments/current', { limit, offset }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};