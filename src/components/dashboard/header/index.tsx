import styled from "styled-components";
import HeaderCard from "../../shared/HeaderCard";
import { useHistory } from "react-router-dom";
import { IBalance } from "../../../@types";
import { faArrowDown, faArrowUp, faChartLine, faChartPie } from "@fortawesome/free-solid-svg-icons";

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
          concept='Incomes'
          variation='green'
          value={balance?.total_incomes || '0.0'}
          onClick={() => history.push('/incomes')}
          loading={loading}
          icon={faArrowUp}
          prefix="$"
        />
        <HeaderCard
          concept='Outcomes'
          variation='red'
          value={balance?.total_outcomes || '0.0'}
          onClick={() => history.push('/outcomes')}
          loading={loading}
          icon={faArrowDown}
          prefix="$"
        />
        <HeaderCard
          concept='Balance'
          variation='blue'
          value={balance?.current_amount || '0.0'}
          onClick={() => history.push('/balances/current')}
          loading={loading}
          icon={faChartLine}
          prefix="$"
        />
        <HeaderCard
          concept='Analytics'
          variation='yellow'
          value={'+ 25'}
          onClick={() => history.push('/balances/current')}
          loading={loading}
          icon={faChartPie}
          suffix="%"
        />
      </HeaderContainer>
  );
};

export default Header;
