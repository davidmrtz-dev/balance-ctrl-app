import styled from "styled-components";
import { IBalance } from "../../../@types";
import HeaderCard from "../../../components/shared/HeaderCard";
import { formatCurrency } from "../../../utils";

const HeaderContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
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
        concept='Amount incomes'
        variation='gray'
        value={formatCurrency(balance?.amount_incomes)}
        loading={loading}
      />
      <HeaderCard
        concept='Amount for payments'
        variation='yellow'
        value={formatCurrency(balance?.amount_for_payments)}
        loading={loading}
      />
      <HeaderCard
        concept='Current amount'
        variation='blue'
        value={formatCurrency(balance?.current_amount)}
        loading={loading}
      />
    </HeaderContainer>
  );
};
