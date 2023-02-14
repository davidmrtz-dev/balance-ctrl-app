import * as Http from '../Http';
import { IOutcomes, TransactionType } from '../../@types';

export const getOutcomes = async({
  offset,
  limit = 5,
  type
}: {
  offset: number;
  limit?: number;
  type: TransactionType
}): Promise<IOutcomes> => {
  const result = await Http.get(`/api/outcomes/${type === 'current' ? 'current' : 'fixed'}`, { limit, offset }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};