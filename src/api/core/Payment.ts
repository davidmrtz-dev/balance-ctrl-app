import * as Http from '../Http';
import { IPayment, IPayments } from '../../@types/IPayment';

export const getPaymentsApplied = async ({
  page,
  pageSize = 5,
  signal
}: {
  page: number;
  pageSize: number;
  signal?: AbortSignal | undefined;
}): Promise<IPayments> => {
  const result = await Http.get('/api/v1/payments/applied', { page, page_size: pageSize }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }, signal);

  return result.data;
};

export const getPaymentsPending = async ({
  page,
  pageSize = 5,
  signal
}: {
  page: number;
  pageSize: number;
  signal?: AbortSignal | undefined;
}): Promise<IPayments> => {
  const result = await Http.get('/api/v1/payments/pending', { page, page_size: pageSize }, {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }, signal);

  return result.data;
};

export const updatePayment = async (values: IPayment): Promise<IPayment> => {
  const result = await Http.put(`/api/v1/payments/${values.id}`, { payment: values }, { headers: {
    'access-token': sessionStorage.getItem('authorization:token') || '',
    client: sessionStorage.getItem('authorization:client') || '',
    uid: sessionStorage.getItem('authorization:uid') || ''
  }});

  return result.data.payment;
};
