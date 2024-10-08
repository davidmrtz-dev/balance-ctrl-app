import { Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { IBalance } from "../../@types";
import { getCurrentBalance } from "../../api/core/Balance";
import { useAuthContext } from "../../context/AuthContext";
import { theme } from "../../Theme";
import Alert from "../../components/alert";
import { Outcomes } from "../../components/dashboard/outcomes";
import { getOutcomesCurrent, getOutcomesFixed } from "../../api/core/Outcome";
import Header from "../../components/dashboard/header/Header";
import Onboarding from "../../components/onboarding";

const Home = (): JSX.Element => {
  const auth = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<IBalance | null>(null);

  const fetchBalance = useCallback(async (): Promise<void> => {
    try {
      const balance = await getCurrentBalance();
      setBalance(balance);
      setLoading(false);
    } catch (err: any) {
      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: err.errors || 'There was an error, please try again later'
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
    <Onboarding route="/" />
    <Typography style={{
      ...theme.texts.brandH5,
      margin: '16px 0'
    }}>
      Hi, {auth.user?.name}
    </Typography>
    <Header
      id='home-header'
      balance={balance}
      loading={loading}
    />
    <Outcomes
      id='home-current-outcomes'
      idAdd='home-current-outcomes-add'
      idPagination="home-current-outcomes-pagination"
      getOutcomes={fetchOutcomesCurrent}
      updateBalance={fetchBalance}
      category='Cash and debit'
      type='current'
    />
    <Outcomes
      id='home-fixed-outcomes'
      idPagination="home-fixed-outcomes-pagination"
      idAdd='home-fixed-outcomes-add'
      getOutcomes={fetchOutcomesFixed}
      updateBalance={fetchBalance}
      category='Credit'
      type='fixed'
    />
  </>);
};

export default Home;
