import * as Http from '../Http';
import { IPayments } from '../../@types';

export const getCurrentPayments = async ({
  offset,
  limit = 5
}: {
  offset: number;
  limit?: number;
}): Promise<IPayments> => {
  const result = await Http.get('/api/payments/current', { limit, offset }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};

export const getFixedPayments = async ({
  limit,
  offset
}: {
  limit: number;
  offset: number;
}): Promise<IPayments> => {
  const result = await Http.get('/api/payments/fixed', { limit, offset }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};