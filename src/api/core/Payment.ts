import * as Http from '../Http';
import { ICurrentPayments, IFixedPayments } from '../../@types';

export const getCurrentPayments = async ({
  limit,
  offset
}: {
  limit: number;
  offset: number;
}): Promise<ICurrentPayments> => {
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
}): Promise<IFixedPayments> => {
  const result = await Http.get('/api/payments/fixed', { limit, offset }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};