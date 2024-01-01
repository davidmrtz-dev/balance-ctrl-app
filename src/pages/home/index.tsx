import { Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { IBalance, TransactionType } from "../../@types";
import { getBalance } from "../../api/core/Balance";
import { getOutcomes } from "../../api/core/Outcome";
import { useAuthContext } from "../../context/AuthContext";
import { theme } from "../../Theme";
import Alert from "../../components/alert";
import { Outcomes } from "../../components/dashboard/outcomes";
import Header from "../../components/dashboard/header";

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

  const fetchOutcomes = useCallback(async (offset: number, type: TransactionType) => {
    return getOutcomes({ offset, type });
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
      fetchData={fetchOutcomes}
      updateBalance={fetchBalance}
      category='Cash and Debit'
      type='current'
    />
    <Outcomes
      fetchData={fetchOutcomes}
      updateBalance={fetchBalance}
      category='Credit'
      type='fixed'
    />
  </>);
};

export default Home;
