import { ICategory } from "../../@types";
import * as Http from '../Http';

export const getCategories = async(): Promise<{ categories: ICategory [] }> => {
  const result = await Http.get('/api/v1/categories', null, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });

  return result.data;
};
