import * as Http from '../Http';
import { IOutcomes } from '../../@types';

export const getCurrentOutcomes = async ({
  offset,
  limit = 5
}: {
  offset: number;
  limit?: number;
}): Promise<IOutcomes> => {
  const result = await Http.get('/api/outcomes/current', { limit, offset }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};

export const getFixedOutcomes = async ({
  offset,
  limit = 5
}: {
  offset: number;
  limit?: number;
}): Promise<IOutcomes> => {
  const result = await Http.get('/api/outcomes/fixed', { limit, offset }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};