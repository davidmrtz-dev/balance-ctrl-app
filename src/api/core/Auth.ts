import * as Http from '../Http';
import { IUser, Login } from '../../@types/IUser';

export const login = async (params: Login): Promise<IUser> => {
  const result: any = await Http.post('/api/auth/sign_in', params);
  if (result.headers['access-token']) {
    sessionStorage.setItem('authorization:token', result.headers['access-token']);
  }
  if (result.headers['client']) {
    sessionStorage.setItem('authorization:client', result.headers['client']);
  }
  if (result.headers['uid']) {
    sessionStorage.setItem('authorization:uid', result.headers['uid']);
  }
  return result.data.data;
};

export const logout = async (): Promise<void> => {
  await Http.destroy('/api/auth/sign_out', {}, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || '',
  });
};

export const ping = async (): Promise<any> => {
  return await Http.get('/api/user/ping');
};

