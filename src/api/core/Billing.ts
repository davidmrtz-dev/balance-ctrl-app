import { IBilling } from "../../@types";
import * as Http from '../Http';

export const getBillings = async(): Promise<{ billings: IBilling [] }> => {
  const result = await Http.get('/api/v1/billings', undefined, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};
