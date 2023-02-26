import * as Http from '../Http';
import { IOutcome, IOutcomes, TransactionType } from '../../@types';

export const getOutcomes = async ({
  offset,
  limit = 5,
  type
}: {
  offset: number;
  limit?: number;
  type?: TransactionType;
}): Promise<IOutcomes> => {
  const route = type ? `/api/outcomes/${type}` : '/api/outcomes'
  const result = await Http.get(route, { limit, offset }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};

export const createOutcome = async (values: IOutcome): Promise<void> => {
  await Http.post('/api/outcomes/', { outcome: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});
};

export const updateOutcome = async (values: IOutcome): Promise<IOutcome> => {
  const result = await Http.put(`/api/outcomes/${values.id}`, { outcome: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.outcome;
};

export const deleteOutcome = async (id: number): Promise<void> => {
  await Http.destroy(`/api/outcomes/${id}`, null, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });
};

export const searchOutcomes = async ({
  offset,
  keyword,
  start_date,
  end_date,
  limit = 5
}: {
  offset: number;
  keyword: string;
  start_date: string;
  end_date: string;
  limit?: number;
}): Promise<IOutcomes> => {
  const result = await Http.get('/api/outcomes/search', { limit, offset, keyword, start_date, end_date }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};