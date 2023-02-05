import styled from "styled-components";
import { HeaderCard } from "../../components/dashboard";
import { useAuthContext } from "../../context/AuthContext";

const DashboardContainer = styled.div`
  width: 100%;
  height: 50vh;
  background-color: pink;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: green;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
`;

const Home = (): JSX.Element => {
  const auth = useAuthContext();

  return (
    <DashboardContainer>
      Hi, {auth.user?.name}
      <HeaderContainer>
        <HeaderCard />
        <HeaderCard />
        <HeaderCard />
        <HeaderCard />
      </HeaderContainer>
    </DashboardContainer>
  );
};

export default Home;