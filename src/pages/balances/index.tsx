import { useCallback, useState } from "react";
import { IBalance } from "../../@types";
import { Header } from "./header/Header";
import { Payments } from "./payments/Payments";
import { getPaymentsApplied, getPaymentsPending } from "../../api/core/Payment";
import { Selector } from "./Selector";

const Balance = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<IBalance | null>(null);
  const [refresh, setRefresh] = useState(false);

  const handleBalance = (balance: IBalance) => {
    setBalance(balance);
    setLoading(false);
    setRefresh(true);
  };

  const fetchPaymentsApplied = async ({
    page,
    pageSize,
    signal
  }: {
    page: number,
    pageSize: number,
    signal: AbortSignal
  }) => {
    return getPaymentsApplied({ balanceId: balance?.id, page, pageSize, signal });
  };

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

  return(<>
    <Selector
      handleBalance={handleBalance}
    />
    <Header
      balance={balance}
      loading={loading}
    />
    {balance && <Payments
      headerText='Applied Payments'
      getPayments={fetchPaymentsApplied}
      refresh={refresh}
      setRefresh={setRefresh}
      type='applied'
    />}
    {balance?.["current?"] && <Payments
      headerText='Pending Payments'
      getPayments={fetchPaymentsPending}
      refresh={refresh}
      setRefresh={setRefresh}
      type='pending'
    />}
  </>);
};

export default Balance;
