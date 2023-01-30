import { IUser, Login } from '../../@types/IUser';
import * as Http from '../Http';

export const login = async (params: Login): Promise<IUser> => {
  const result: any = await Http.post('/api/auth/sign_in', params);
  debugger;
  return result.data;
};

export const logout = async (): Promise<void> => {
  await Http.destroy('/api/auth/sign_out');
};

export const ping = async (): Promise<any> => {
  return await Http.get('/api/user/ping');
};

