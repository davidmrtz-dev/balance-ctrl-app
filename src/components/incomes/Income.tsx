import { Typography } from "antd";
import styled from "styled-components";
import { IIncome } from "../../@types";
import { theme } from "../../Theme";
import { capitalizeFirst, formatCurrency, formatViewDate } from "../../utils";

const IncomeContainer = styled.div`
  background-color: ${p => p.theme.colors.grays.light};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 5px 0;
  cursor: default;
  position: relative;
`;

const IncomeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: repeat(5, 1fr);
  padding: 10px;
`;

export const Income = ({
  income
}: {
  income: IIncome;
}): JSX.Element => <IncomeContainer>
  <div style={{ textAlign: 'initial' }}>
    <IncomeGrid>
    <div style={{ gridArea: '1 / 1 / 2 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Name:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '1 / 2 / 2 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {income.description}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '2 / 1 / 3 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Frequency:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '2 / 2 / 3 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {capitalizeFirst(income.frequency || '')}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '3 / 1 / 4 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Amount:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '3 / 2 / 4 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {formatCurrency(income.amount)}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '4 / 1 / 5 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Type:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '4 / 2 / 5 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {capitalizeFirst(income.transaction_type)}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '5 / 1 / 6 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Status:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '5 / 2 / 6 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          Active
        </Typography.Text>
      </div>
    </IncomeGrid>
  </div>
</IncomeContainer>;