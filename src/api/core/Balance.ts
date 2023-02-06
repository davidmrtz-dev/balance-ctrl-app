import * as Http from '../Http';
import { IBalance } from '../../@types';

export const getBalance = async (): Promise<IBalance> => {
  const result = await Http.get('/api/balances/balance');
  return result.data;
};