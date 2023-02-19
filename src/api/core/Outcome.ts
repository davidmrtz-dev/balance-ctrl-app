import * as Http from '../Http';
import { IOutcome, IOutcomeNew, IOutcomes, TransactionType } from '../../@types';

export const getOutcomes = async({
  offset,
  limit = 5,
  type
}: {
  offset: number;
  limit?: number;
  type: TransactionType
}): Promise<IOutcomes> => {
  const result = await Http.get(`/api/outcomes/${type}`, { limit, offset }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};

export const createOutcome = async(values: IOutcomeNew): Promise<void> => {
  await Http.post('/api/outcomes/', { outcome: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});
};

export const updateOutcome = async(values: IOutcome): Promise<IOutcome> => {
  const result = await Http.put(`/api/outcomes/${values.id}`, { outcome: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.outcome;
};

export const deleteOutcome = async(id: number): Promise<void> => {
  await Http.destroy(`/api/outcomes/${id}`, null, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });
};