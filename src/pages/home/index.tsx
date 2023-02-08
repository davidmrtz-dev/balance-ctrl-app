import { Typography } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IBalance, IPayment, NavigationStatus } from "../../@types";
import { getBalance } from "../../api/core/Balance";
import { getPayments } from "../../api/core/Payment";
import { HeaderCard, Transactions } from "../../components/dashboard";
import { useAuthContext } from "../../context/AuthContext";
import { theme } from "../../Theme";
import { parsedInt } from "../../utils";

const HeaderContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`;

interface PaymentsHash { [key: number]: IPayment[] };

const Home = (): JSX.Element => {
  const auth = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<IBalance | null>(null);
  const [payments, setPayments] = useState<PaymentsHash>({});
  const [navStatus, setNavStatus] = useState<NavigationStatus>({});

  const handleLeftClick = () => {
    const activeKey =
      parsedInt(
        Object.keys(navStatus).find(k => navStatus[parsedInt(k) as keyof typeof navStatus])
      );

    if (activeKey > 0) {
      setNavStatus({
        ...navStatus,
        [activeKey]: false,
        [activeKey - 1]: true
      });
    }
  };

  const handleRightClick = () => {
    const activeKey =
      parsedInt(
        Object.keys(navStatus).find(k => navStatus[parsedInt(k) as keyof typeof navStatus])
      );

    if (activeKey < Object.keys(navStatus).length - 1) {
      setNavStatus({
        ...navStatus,
        [activeKey]: false,
        [activeKey + 1]: true
      });
    }
  };

  // const

  const fetchBalance = async (): Promise<void> => {
    try {
      const balance = await getBalance();
      setBalance(balance);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPayments = async (): Promise<void> => {
    try {
      const payments = await getPayments({ limit: 5, offset: 0});
      setPayments({ 0: payments.fixed });
      setNavStatus( { 0: false, 1: false, 2: true, 3: false, 4: false, 5: false });
    } catch(error) {
      console.log(error);
    }
  };

  const fetchData = async (): Promise<void> => {
    try {
      await fetchBalance();
      await fetchPayments();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
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
        onLeftClick={handleLeftClick}
        onRightClick={handleRightClick}
        category='Recent Payments'
        keepOpen
        loading={loading}
        transactions={payments[0]}
        status={navStatus}
      />
      {/* <Transactions category='Fixed Payments' keepOpen /> */}
    </>
  );
};

export default Home;