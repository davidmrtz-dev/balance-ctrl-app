import { useCallback, useState } from "react";
import { IBalance } from "../../@types";
import { Header } from "./header/Header";
import { Payments } from "./payments/Payments";
import { getPaymentsApplied, getPaymentsPending } from "../../api/core/Payment";
import BalanceSelector from "../../components/balance-selector";
import { Offset } from "../../atoms/Offset";
import Onboarding from "../../components/onboarding";

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
    <Onboarding route="/balance" />
    <Offset />
    <BalanceSelector
      id='balance-selector'
      handleBalance={handleBalance}
    />
    <Header
      id='balance-header'
      balance={balance}
      loading={loading}
    />
    {balance && <Payments
      id='balance-applied'
      idPagination='balance-applied-pagination'
      headerText='Applied Payments'
      getPayments={fetchPaymentsApplied}
      refresh={refresh}
      setRefresh={setRefresh}
      type='applied'
    />}
    {balance?.["current?"] && <Payments
      id='balance-pending'
      idPagination='balance-pending-pagination'
      headerText='Pending Payments'
      getPayments={fetchPaymentsPending}
      refresh={refresh}
      setRefresh={setRefresh}
      type='pending'
    />}
  </>);
};

export default Balance;
