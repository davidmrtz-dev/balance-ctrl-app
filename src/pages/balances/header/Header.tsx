import styled from "styled-components";
import { IBalance } from "../../../@types";
import HeaderCard from "../../../components/shared/HeaderCard";
import { formatCurrency } from "../../../utils";

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 8px;
  max-height: 383.4px;
`;

export const Header = ({
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
        value={formatCurrency(balance?.amount_incomes)}
        loading={loading}
        style={{ gridArea: '1 / 1 / 2 / 3'}}
      />
      <HeaderCard
        concept='Amount for payments'
        variation='yellow'
        value={formatCurrency(balance?.amount_for_payments)}
        loading={loading}
        style={{ gridArea: '2 / 1 / 3 / 3'}}
      />
      <HeaderCard
        concept='Applied payments'
        variation='yellow'
        value={formatCurrency(balance?.amount_paid)}
        loading={loading}
        style={{ gridArea: '3 / 1 / 4 / 2'}}
      />
      <HeaderCard
        concept='Pending payments'
        variation='yellow'
        value={formatCurrency(balance?.amount_to_be_paid)}
        loading={loading}
        style={{ gridArea: '3 / 2 / 4 / 3'}}
      />
      <HeaderCard
        concept='Amount after payments'
        variation='blue'
        value={formatCurrency(balance?.current_amount)}
        loading={loading}
        style={{ gridArea: '4 / 1 / 5 / 3'}}
      />
      <HeaderCard
        concept='Savings this month'
        variation='green'
        value={'+25'}
        loading={loading}
        style={{ gridArea: '5 / 1 / 6 / 3'}}
        suffix="%"
      />
    </HeaderContainer>
  );
};
