import styled from "styled-components";
import HeaderCard from "../../shared/HeaderCard";
import { useHistory } from "react-router-dom";
import { IBalance } from "../../../@types";
import { faArrowDown, faArrowUp, faChartLine, faChartPie } from "@fortawesome/free-solid-svg-icons";
import { formatCurrency } from "../../../utils";

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
          value={formatCurrency(balance?.amount_incomes)}
          onClick={() => history.push('/incomes')}
          loading={loading}
          icon={faArrowUp}
        />
        <HeaderCard
          concept='Outcomes'
          variation='red'
          value={formatCurrency(balance?.amount_outcomes)}
          onClick={() => history.push('/outcomes')}
          loading={loading}
          icon={faArrowDown}
        />
        <HeaderCard
          concept='Balance'
          variation='blue'
          value={formatCurrency(balance?.current_amount)}
          onClick={() => history.push('/balance')}
          loading={loading}
          icon={faChartLine}
        />
        <HeaderCard
          concept='Analytics'
          variation='yellow'
          value={'+25'}
          onClick={() => history.push('/balance')}
          loading={loading}
          icon={faChartPie}
          suffix="%"
        />
      </HeaderContainer>
  );
};

export default Header;
