import { Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { IBalance } from "../../@types";
import { getBalance } from "../../api/core/Balance";
import { useAuthContext } from "../../context/AuthContext";
import { theme } from "../../Theme";
import Alert from "../../components/alert";
import { Outcomes } from "../../components/dashboard/outcomes";
import Header from "../../components/dashboard/header";
import { getOutcomesCurrent, getOutcomesFixed } from "../../api/core/Outcome";

const Home = (): JSX.Element => {
  const auth = useAuthContext();
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

  const fetchOutcomesCurrent = useCallback(async ({
    page,
    pageSize,
    signal
  }: {
    page: number,
    pageSize: number,
    signal: AbortSignal
  }) => {
    return getOutcomesCurrent({ page, pageSize, signal });
  }, []);

  const fetchOutcomesFixed = useCallback(async ({
    page,
    pageSize,
    signal
  }: {
    page: number,
    pageSize: number,
    signal: AbortSignal
  }) => {
    return getOutcomesFixed({ page, pageSize, signal });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchBalance();
    }, 2000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (<>
    <Typography style={{
      ...theme.texts.brandH5,
      margin: '16px 0'
    }}>
      Hi, {auth.user?.name}
    </Typography>
    <Header
      balance={balance}
      loading={loading}
    />
    <Outcomes
      getOutcomes={fetchOutcomesCurrent}
      updateBalance={fetchBalance}
      category='Paid Purchases'
      type='current'
    />
    <Outcomes
      getOutcomes={fetchOutcomesFixed}
      updateBalance={fetchBalance}
      category='To Pay Purchases'
      type='fixed'
    />
  </>);
};

export default Home;
