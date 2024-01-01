import { useCallback, useEffect, useState } from "react";
import { IBalance } from "../../../@types";
import { getBalance } from "../../../api/core/Balance";
import Alert from "../../../components/alert";
import Header from "../../../components/balances/header";
import { Payments } from "../payments/Payments";

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
    <Payments />
  </>);
};

export default BalanceCurrent;
