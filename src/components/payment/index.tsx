import styled from "styled-components"
import { theme } from "../../Theme"
import { SubFontText } from "../../atoms/text";
import { IPayment } from "../../@types";
import { capitalizeFirst } from "../../utils";

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

const Payment = (payment: IPayment): JSX.Element => {
  return (<PaymentWrapper>
      <PaymentContentWrapper>
        {SubFontText('Amount:')}
        {SubFontText(`$ ${payment.amount}`)}
      </PaymentContentWrapper>
      <PaymentContentWrapper>
        {SubFontText('Status:')}
        {SubFontText(capitalizeFirst(payment.status))}
      </PaymentContentWrapper>
  </PaymentWrapper>);
};

export default Payment;
