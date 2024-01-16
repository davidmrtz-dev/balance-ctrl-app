import { IBilling, IBillings } from "../../@types";
import * as Http from '../Http';

export const getBillings = async(): Promise<IBillings> => {
  const result = await Http.get('/api/v1/billings', null, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};

export const createBilling = async (values: IBilling): Promise<IBilling> => {
  const result = await Http.post('/api/v1/billings', { billing: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.billing;
};

export const updateBilling = async (id: number, values: IBilling): Promise<IBilling> => {
  const result = await Http.put(`/api/v1/billings/${id}`, { billing: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.billing;
};
