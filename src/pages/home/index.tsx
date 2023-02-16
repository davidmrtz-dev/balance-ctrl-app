import { Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { IBalance, TransactionType } from "../../@types";
import { getBalance } from "../../api/core/Balance";
import { getOutcomes } from "../../api/core/Outcome";
import Alert from "../../components/alert";
import { HeaderCard } from "../../components/dashboard";
import { Transactions } from "../../components/transactions";
import { useAuthContext } from "../../context/AuthContext";
import { theme } from "../../Theme";
import InitialScreen from "./InitialScreen";

const HeaderContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`;

const Home = (): JSX.Element => {
  const auth = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<IBalance | null>(null);
  const [showInit, setShowInit] = useState(true);

  const fetchBalance = useCallback(async (): Promise<void> => {
    try {
      const balance = await getBalance();
      setBalance(balance);
      setLoading(false);
    } catch (_err) {
      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: 'There was an error, please try again later'
      }), 1000);
    }
  }, []);

  const fetchOutcomes = useCallback(async (offset: number, type: TransactionType) => {
    return getOutcomes({ offset, type });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowInit(false);
      fetchBalance();
    }, 2000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <InitialScreen open={showInit || !balance} />
      <Typography style={{
        ...theme.texts.brandFont
      }}>
        Hi, {auth.user?.name}
      </Typography>
      <br />
      <HeaderContainer>
        <HeaderCard concept='Income' variation='data' value={balance?.total_incomes || '0'} loading={loading} />
        <HeaderCard concept='Expenses' variation='data' value={balance?.total_outcomes || '0'} loading={loading} />
        <HeaderCard concept='Balance' variation='data' value={balance?.current_amount || '0'} loading={loading} />
        <HeaderCard concept='Analytics' variation='graph' value={'+ 25'} loading={loading} />
      </HeaderContainer>
      <Transactions
        fetchData={fetchOutcomes}
        updateBalance={fetchBalance}
        category='Recent Outcomes'
        type='current'
        keepOpen
      />
      {/* <Transactions
        fetchData={fetchOutcomes}
        outcomeType='fixed'
        category='Fixed Outcomes'
      /> */}
    </>
  );
};

export default Home;