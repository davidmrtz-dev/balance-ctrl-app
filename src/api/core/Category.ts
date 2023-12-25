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

export const createCategory = async (name: string): Promise<ICategory> => {
  const result = await Http.post('/api/v1/categories/', {
    category: {
      name
    }
  }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.category;
};

export const updateCategory = async (id: number, name: string): Promise<ICategory> => {
  const result = await Http.put(`/api/v1/categories/${id}`, {
    category: {
      name
    }
  }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.category;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await Http.destroy(`/api/v1/categories/${id}`, undefined, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  });
};
