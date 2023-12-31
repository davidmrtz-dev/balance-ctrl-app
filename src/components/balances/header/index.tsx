import styled from "styled-components";
import { IBalance } from "../../../@types";
import HeaderCard from "../../shared/HeaderCard";

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 8px;
`;

const Header = ({
  balance,
  loading
}: {
  balance?: IBalance | null;
  loading?: boolean;
}): JSX.Element => {
  return(
    <HeaderContainer>
      <HeaderCard
        concept='Current amount'
        variation='gray'
        value={balance?.total_incomes || '0.0'}
        loading={loading}
        style={{ gridArea: '1 / 1 / 2 / 3'}}
        prefix="$"
      />
      <HeaderCard
        concept='Amount for payments'
        variation='yellow'
        value={'0.0'}
        loading={loading}
        style={{ gridArea: '2 / 1 / 3 / 3'}}
        prefix="$"
      />
      <HeaderCard
        concept='Paid'
        variation='yellow'
        value={'0.0'}
        loading={loading}
        style={{ gridArea: '3 / 1 / 4 / 2'}}
        prefix="$"
      />
      <HeaderCard
        concept='To be paid'
        variation='yellow'
        value={'0.0'}
        loading={loading}
        style={{ gridArea: '3 / 2 / 4 / 3'}}
        prefix="$"
      />
      <HeaderCard
        concept='Amount after payments'
        variation='blue'
        value={balance?.current_amount || '0.0'}
        loading={loading}
        style={{ gridArea: '4 / 1 / 5 / 3'}}
        prefix="$"
      />
      <HeaderCard
        concept='Savings this month'
        variation='green'
        value={'+ 25'}
        loading={loading}
        style={{ gridArea: '5 / 1 / 6 / 3'}}
        suffix="%"
      />
    </HeaderContainer>
  );
};

export default Header;
