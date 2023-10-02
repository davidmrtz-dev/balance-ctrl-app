import * as Http from '../Http';
import { IBalance } from '../../@types';

export const getBalance = async (): Promise<IBalance> => {
  const result = await Http.get('/api/v1/balance', null, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || '',
  });

  return result.data.balance;
};
