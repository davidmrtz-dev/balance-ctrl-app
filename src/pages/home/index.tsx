import { Typography } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IBalance, IPayment } from "../../@types";
import { getBalance } from "../../api/core/Balance";
import { getPayments } from "../../api/core/Payment";
import { HeaderCard, Transactions } from "../../components/dashboard";
import { useAuthContext } from "../../context/AuthContext";
import { theme } from "../../Theme";

const HeaderContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`;

interface PaymentsHash { [key: number]: IPayment[] };

interface PaymentPages {
  current: number;
  fixed: number;
}

const Home = (): JSX.Element => {
  const auth = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<IBalance | null>(null);
  const [payments, setPayments] = useState<PaymentsHash>({});
  const [pages, setPages] = useState<PaymentPages>({ current: 0, fixed: 0});
  const [page, setPage] = useState(1);

  const handleLeftClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleRightClick = () => {
    if (page < pages.current) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    const fetchPayments = async (page: number, offset: number): Promise<void> => {
      try {
        const data = await getPayments({ limit: 5, offset: offset});
        setPayments({...payments,  [page]: data.current });
        setPages({ current: data.current_total_pages, fixed: data.fixed_total_pages });
      } catch(error) {
        console.log(error);
      }
    };

    if (page && !payments[page]) {
      setLoading(true);
      fetchPayments(page, (page * 5) - 5);
      setTimeout(() => setLoading(false), 1000);
    }
  }, [page, payments]);

  const fetchBalance = async (): Promise<void> => {
    try {
      const balance = await getBalance();
      setBalance(balance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBalance();
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
        transactions={payments[page]}
        page={page}
      />
      {/* <Transactions category='Fixed Payments' keepOpen /> */}
    </>
  );
};

export default Home;