import { Typography } from "antd";
import styled from "styled-components";
import { IBilling } from "../../@types";
import { ActionButton } from "../../atoms/ActionButton";
import { theme } from "../../Theme";
import { TransactionContainer as BillingContainer } from "../../components/containers";
import { capitalizeFirst } from "../../utils";

const BillingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: repeat(3, 1fr);
  padding: 10px;
`;

export const Billing = ({
  billing,
  onClick
}: {
  billing: IBilling;
  onClick: () => void;
}): JSX.Element => <BillingContainer>
  <div style={{ textAlign: 'initial' }}>
    <BillingGrid>
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
          {billing.name}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '2 / 1 / 3 / 2' }}>
        <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
          <strong>Card:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '2 / 2 / 3 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
          {billing.credit_card_number}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '3 / 1 / 4 / 2' }}>
        <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
          <strong>Type:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '3 / 2 / 4 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
            ...theme.texts.brandSubFont
          }}>
          {capitalizeFirst(billing.billing_type)}
        </Typography.Text>
      </div>
    </BillingGrid>
  </div>
  <ActionButton onClick={onClick} />
</BillingContainer>;

