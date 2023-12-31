import styled from "styled-components";
import HeaderCard from "./HeaderCard";
import { useHistory } from "react-router-dom";
import { IBalance } from "../../../@types";

const HeaderContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`;

const Header = ({
  balance,
  loading
}: {
  balance?: IBalance | null;
  loading?: boolean;
}): JSX.Element => {
  const history = useHistory();
  return(
    <HeaderContainer>
        <HeaderCard
          concept='Income'
          variation='data'
          value={balance?.total_incomes || '0'}
          onClick={() => history.push('/incomes')}
          loading={loading}
        />
        <HeaderCard
          concept='Outcomes'
          variation='data'
          value={balance?.total_outcomes || '0'}
          onClick={() => history.push('/outcomes')}
          loading={loading}
        />
        <HeaderCard concept='Balance' variation='data' value={balance?.current_amount || '0'} loading={loading} />
        <HeaderCard concept='Analytics' variation='graph' value={'+ 25'} loading={loading} />
      </HeaderContainer>
  );
};

export default Header;
