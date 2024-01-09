import { IBillings } from "../../@types";
import * as Http from '../Http';

export const getBillings = async(): Promise<IBillings> => {
  const result = await Http.get('/api/v1/billings', null, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};
