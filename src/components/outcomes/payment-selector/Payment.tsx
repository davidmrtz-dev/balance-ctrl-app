import styled from "styled-components"
import { theme } from "../../../Theme"
import { SubFontText } from "../../../atoms/text";
import { IPayment } from "../../../@types";
import { capitalizeFirst } from "../../../utils";

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 11px;
  border-radius: 6px;
  margin: 8px 0;
  background-color: ${theme.colors.whites.normal};
  border: 1px solid ${theme.colors.grays.light};
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

export const Payment = (payment: IPayment): JSX.Element => {
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
      default:
        return theme.colors.grays.light;
    };
  };

  return (<PaymentWrapper>
      <PaymentContentWrapper>
        {SubFontText('Amount:')}
        {SubFontText(`$ ${payment.amount}`)}
      </PaymentContentWrapper>
      <PaymentContentWrapper>
        {SubFontText('Status:')}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StatusCircle style={{ backgroundColor: getStatusColor() }} />
          {SubFontText(capitalizeFirst(payment.status))}
        </div>
      </PaymentContentWrapper>
  </PaymentWrapper>);
};
