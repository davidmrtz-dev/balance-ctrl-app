import { useCallback, useEffect, useState } from "react";
import { IBalance } from "../../../@types";
import { getBalance } from "../../../api/core/Balance";
import Alert from "../../../components/alert";
import Header from "../../../components/balances/header";
import { Payments } from "../payments/Payments";
import { getPaymentsApplied, getPaymentsPending } from "../../../api/core/Payment";

const BalanceCurrent = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<IBalance | null>(null);

  const fetchBalance = useCallback(async (): Promise<void> => {
    try {
      const balance = await getBalance();
      setBalance(balance);
      setLoading(false);
    } catch (err: any) {
      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: err.error || 'There was an error, please try again later'
      }), 1000);
    }
  }, []);

  const fetchPaymentsApplied = useCallback(async ({
    page,
    pageSize,
    signal
  }: {
    page: number,
    pageSize: number,
    signal: AbortSignal
  }) => {
    return getPaymentsApplied({ page, pageSize, signal });
  }, []);

  const fetchPaymentsPending = useCallback(async ({
    page,
    pageSize,
    signal
  }: {
    page: number,
    pageSize: number,
    signal: AbortSignal
  }) => {
    return getPaymentsPending({ page, pageSize, signal });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchBalance();
    }, 2000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(<>
    <Header
      balance={balance}
      loading={loading}
    />
    <Payments
      headerText='Applied Payments'
      getPayments={fetchPaymentsApplied}
    />
    <Payments
      headerText='Pending Payments'
      getPayments={fetchPaymentsPending}
    />
  </>);
};

export default BalanceCurrent;
