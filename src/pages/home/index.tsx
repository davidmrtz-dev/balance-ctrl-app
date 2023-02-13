import { Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { IBalance } from "../../@types";
import { getBalance } from "../../api/core/Balance";
import { getCurrentPayments, getFixedPayments } from "../../api/core/Payment";
import Alert from "../../components/alert";
import { HeaderCard, Transactions } from "../../components/dashboard";
import { useAuthContext } from "../../context/AuthContext";
import { theme } from "../../Theme";

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

  useEffect(() => {
    const fetchBalance = async (): Promise<void> => {
      try {
        const balance = await getBalance();
        setBalance(balance);
        setLoading(false);
      } catch (_err) {
        Alert({
          icon: 'error',
          title: 'Ops!',
          text: 'There was an error, please try again later.'
        });
      }
    };

    fetchBalance();
  }, []);

  const fetchCurrentPayments = useCallback((offset: number) => {
    return getCurrentPayments({ offset });
  }, []);

  const fetchFixedPayments = useCallback((offset: number) => {
    return getFixedPayments({ offset });
  }, []);

  return(
    <>
      <Typography style={{
        ...theme.texts.brandFont
      }}>
        Hi, {auth.user?.name}
      </Typography>
      <br />
      <HeaderContainer>
        <HeaderCard concept='Income' variation='data' value={balance?.total_income || '0'} loading={loading} />
        <HeaderCard concept='Expenses' variation='data' value={balance?.total_expenses || '0'} loading={loading} />
        <HeaderCard concept='Balance' variation='data' value={balance?.total_balance || '0'} loading={loading} />
        <HeaderCard concept='Analytics' variation='graph' value={'+ 25'} loading={loading} />
      </HeaderContainer>
      <Transactions
        fetchData={fetchCurrentPayments}
        category='Recent Payments'
        keepOpen
      />
      <Transactions
        fetchData={fetchFixedPayments}
        category='Fixed Payments'
        keepOpen
      />
    </>
  );
};

export default Home;