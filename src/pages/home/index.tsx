import { Typography } from "antd";
import styled from "styled-components";
import { HeaderCard } from "../../components/dashboard";
import { useAuthContext } from "../../context/AuthContext";
import { theme } from "../../Theme";

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: green;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`;

const Home = (): JSX.Element => {
  const auth = useAuthContext();

  return (
    <>
      <Typography style={{
        ...theme.texts.brandFont
      }}>
        Hi, {auth.user?.name}
      </Typography>
      <br />
      <HeaderContainer>
        <HeaderCard />
        <HeaderCard />
        <HeaderCard />
        <HeaderCard />
      </HeaderContainer>
    </>
  );
};

export default Home;