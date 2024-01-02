import styled from "styled-components"
import { theme } from "../../../Theme"
import { SubFontText } from "../../../atoms/text";
import { IPayment } from "../../../@types";
import { capitalizeFirst, formatCurrency } from "../../../utils";

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 11px;
  border-radius: 6px;
  margin: 8px 0;
  background-color: ${theme.colors.whites.normal};
  border: 1px solid ${theme.colors.grays.light};
  cursor: pointer;
`;

const PaymentContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StatusCircle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const Payment = ({
  payment,
  onClick
}: {
  payment: IPayment;
  onClick: () => void;
}): JSX.Element => {
  const getStatusColor = () => {
    switch (payment.status) {
      case 'hold':
        return theme.colors.grays.normal;
      case 'pending':
        return theme.colors.yellows.normal;
      case 'applied':
        return theme.colors.greens.normal;
      case 'expired':
        return theme.colors.reds.normal;
      case 'cancelled':
        return theme.colors.reds.normal;
      default:
        return theme.colors.grays.light;
    };
  };

  return (<PaymentContainer onClick={onClick}>
      <PaymentContentWrapper>
        {SubFontText('Amount:')}
        {SubFontText(formatCurrency(payment.amount))}
      </PaymentContentWrapper>
      <PaymentContentWrapper>
        {SubFontText('Purchase:')}
        {SubFontText(payment.paymentable?.description || 'N/A')}
      </PaymentContentWrapper>
      <PaymentContentWrapper>
        {SubFontText('Status:')}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StatusCircle style={{ backgroundColor: getStatusColor() }} />
          {SubFontText(capitalizeFirst(payment.status))}
        </div>
      </PaymentContentWrapper>
  </PaymentContainer>);
};
