import { IUser, Login } from '../../@types/IUser';
import * as Http from '../Http';

export const login = async (params: Login): Promise<IUser> => {
  const result: any = await Http.post('/api/user/login', { user: params });

  return result.data;
};

export const logout = async (): Promise<void> => {
  await Http.destroy('/api/user/logout');
};

export const ping = async (): Promise<any> => {
  return await Http.get('/api/user/ping');
};

