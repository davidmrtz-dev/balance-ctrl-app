import * as Http from '../Http';
import { IBalance, IBalances } from '../../@types';

export const getCurrentBalance = async (): Promise<IBalance> => {
  const result = await Http.get('/api/v1/balance', null, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || '',
  });

  return result.data.balance;
};

export const getBalances = async (): Promise<IBalances> => {
  const result = await Http.get('/api/v1/balances', null, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || '',
  });

  return result.data;
};
