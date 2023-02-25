import * as Http from '../Http';
import { IIncomes } from '../../@types';

export const getIncomes = async({
  offset,
  limit = 5,
}: {
  offset: number;
  limit?: number;
}): Promise<IIncomes> => {
  const result = await Http.get('/api/incomes', { limit, offset }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};