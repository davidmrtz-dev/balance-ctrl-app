import { Typography } from "antd";
import styled from "styled-components";
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

  return(
    <>
      <Typography style={{
        ...theme.texts.brandFont
      }}>
        Hi, {auth.user?.name}
      </Typography>
      <br />
      <HeaderContainer>
        <HeaderCard concept='Income' variation='data' amount={'1,000,000'} loading />
        <HeaderCard concept='Expenses' variation='data' amount={'1,000,000'} />
        <HeaderCard concept='Balance' variation='data' amount={'1,000,000'} />
        <HeaderCard concept='Analytics' variation='graph' amount={'1,000,000'} />
      </HeaderContainer>
      <Transactions category='Recent Payments' keepOpen loading />
      <Transactions category='Fixed Payments' keepOpen />
    </>
  );
};

export default Home;