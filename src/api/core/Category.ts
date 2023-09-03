import { ICategory } from "../../@types";
import * as Http from '../Http';

export const getCategories = async(): Promise<ICategory []> => {
  const result = await Http.get('/api/incomes', undefined, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};
