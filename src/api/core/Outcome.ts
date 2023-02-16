import * as Http from '../Http';
import { IOutcome, ICurrentOutcomeNew, IOutcomes, TransactionType } from '../../@types';

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

export const createOutcome = async(values: ICurrentOutcomeNew): Promise<IOutcome> => {
  const result = await Http.post('/api/outcomes/', { outcome: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.outcome;
};

export const updateOutcome = async(values: IOutcome): Promise<IOutcome> => {
  const result = await Http.put(`/api/outcomes/${values.id}`, { outcome: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.outcome;
};