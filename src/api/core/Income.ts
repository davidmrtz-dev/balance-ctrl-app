import * as Http from '../Http';
import { IIncome, IIncomes } from '../../@types';

export const getIncomes = async({
  offset,
  limit = 5,
}: {
  offset: number;
  limit?: number;
}): Promise<IIncomes> => {
  const result = await Http.get('/api/v1/incomes', { limit, offset }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};

export const createIncome = async (values: IIncome): Promise<IIncome> => {
  const result = await Http.post('/api/v1/incomes/', { income: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.income;
};

export const updateIncome = async (values: IIncome): Promise<IIncome> => {
  const result = await Http.put(`/api/v1/incomes/${values.id}`, { income: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.income;
};

export const deleteIncome = async (id: number): Promise<void> => {
  await Http.destroy(`/api/v1/incomes/${id}`, undefined, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });
};
