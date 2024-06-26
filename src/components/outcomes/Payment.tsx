import styled from "styled-components"
import { theme } from "../../Theme"
import { SubFontText } from "../../atoms/text";
import { IPayment } from "../../@types";
import { capitalizeFirst, formatCurrency } from "../../utils";
import { getPaymentStatusColor } from "../payments";
import dayjs from "dayjs";

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

export const Payment = (payment: IPayment): JSX.Element => <PaymentWrapper>
    <PaymentContentWrapper>
      {SubFontText('Amount:')}
      {SubFontText(formatCurrency(payment.amount))}
    </PaymentContentWrapper>
    <PaymentContentWrapper>
      {SubFontText('Status:')}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <StatusCircle style={{ backgroundColor: getPaymentStatusColor(payment.status) }} />
        {SubFontText(capitalizeFirst(payment.status))}
      </div>
    </PaymentContentWrapper>
    {payment.paid_at && (<PaymentContentWrapper>
      {SubFontText('Paid at:')}
      {SubFontText(dayjs(payment.paid_at).format('YYYY-MM-DD HH:mm:ss'))}
    </PaymentContentWrapper>)}
</PaymentWrapper>;
