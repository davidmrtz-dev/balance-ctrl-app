import * as Http from '../Http';
import { IOutcome, IOutcomes } from '../../@types';

export const getOutcomesCurrent = async ({
  page,
  pageSize = 5,
  signal
}: {
  page: number;
  pageSize: number;
  signal?: AbortSignal | undefined;
}): Promise<IOutcomes> => {
  const result = await Http.get('/api/v1/outcomes/current', { page, page_size: pageSize }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }, signal);

  return result.data;
};

export const getOutcomesFixed = async ({
  page,
  pageSize = 5,
  signal
}: {
  page: number;
  pageSize: number;
  signal?: AbortSignal | undefined;
}): Promise<IOutcomes> => {
  const result = await Http.get('/api/v1/outcomes/fixed', { page, page_size: pageSize }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }, signal);

  return result.data;
}

export const getOutcomesIndex = async ({
  page,
  pageSize = 10,
  signal
}: {
  page: number;
  pageSize: number;
  signal?: AbortSignal | undefined;
}): Promise<IOutcomes> => {
  const result = await Http.get('/api/v1/outcomes', { page, page_size: pageSize }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }, signal);

  return result.data;
};

export const createOutcome = async (values: IOutcome): Promise<IOutcome> => {
  const result = await Http.post('/api/v1/outcomes/', { outcome: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.outcome;
};

export const updateOutcome = async (values: IOutcome): Promise<IOutcome> => {
  const result = await Http.put(`/api/v1/outcomes/${values.id}`, { outcome: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.outcome;
};

export const deleteOutcome = async (id: number): Promise<void> => {
  await Http.destroy(`/api/v1/outcomes/${id}`, undefined, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });
};

export const searchOutcomes = async ({
  page,
  pageSize = 10,
  keyword,
  start_date,
  end_date,
  signal
}: {
  page: number;
  pageSize: number;
  keyword: string;
  start_date: string;
  end_date: string;
  signal?: AbortSignal | undefined;
}): Promise<IOutcomes> => {
  const result = await Http.get('/api/v1/outcomes/search', { page, page_size: pageSize, keyword, start_date, end_date }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }, signal);

  return result.data;
};
