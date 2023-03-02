import { Typography } from "antd";
import dayjs from "dayjs";
import styled from "styled-components";
import { IOutcome } from "../../@types";
import { ActionButton } from "../../atoms/ActionButton";
import { theme } from "../../Theme";
import { formatCurrency, formatViewDate, capitalizeFirst } from "../../utils";
import { TransactionContainer as OutcomeContainer } from "../../components/containers";

const OutcomeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: repeat(6, 1fr);
  padding: 10px;
`;

export const Outcome = ({
  outcome,
  onClick
}: {
  outcome: IOutcome;
  onClick: () => void;
}): JSX.Element => <OutcomeContainer>
  <div style={{ textAlign: 'initial' }}>
    <OutcomeGrid>
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
          {outcome.description}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '2 / 1 / 3 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Purchase date:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '2 / 2 / 3 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {formatViewDate(outcome.transaction_date || dayjs().format('YYYY-MM-DD'))}
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
          {formatCurrency(outcome.amount)}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '4 / 1 / 5 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Payments:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '4 / 2 / 5 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {outcome.quotas ? `${outcome.quotas} months` : 'N/A'}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '5 / 1 / 6 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Type:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '5 / 2 / 6 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {capitalizeFirst(outcome.transaction_type)}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '6 / 1 / 7 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Status:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '6 / 2 / 7 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          Active
        </Typography.Text>
      </div>
    </OutcomeGrid>
  </div>
  <ActionButton onClick={onClick} />
</OutcomeContainer>;

