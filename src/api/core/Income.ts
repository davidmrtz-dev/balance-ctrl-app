import * as Http from '../Http';
import { IIncome, IIncomes } from '../../@types';

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

export const createIncome = async (values: IIncome): Promise<IIncome> => {
  const result = await Http.post('/api/incomes/', { income: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.income;
};

export const updateIncome = async (values: IIncome): Promise<IIncome> => {
  const result = await Http.put(`/api/outcomes/${values.id}`, { income: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.income;
};