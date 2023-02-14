import { Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { IBalance } from "../../@types";
import { OutcomeType } from "../../@types/IOutcome";
import { getBalance } from "../../api/core/Balance";
import { getCurrentOutcomes, getFixedOutcomes } from "../../api/core/Outcome";
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

  const fetchOutcomes = useCallback((offset: number, type: OutcomeType) => {
    if (type === 'current') {
      return getCurrentOutcomes({ offset });
    } else {
      return getFixedOutcomes({ offset });
    }
  }, [])

  return(
    <>
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
        category='Recent Outcomes'
        outcomeType='current'
        keepOpen
      />
      <Transactions
        fetchData={fetchOutcomes}
        outcomeType='fixed'
        category='Fixed Outcomes'
        keepOpen
      />
    </>
  );
};

export default Home;