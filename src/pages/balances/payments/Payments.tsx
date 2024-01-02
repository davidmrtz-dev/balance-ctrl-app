import { Collapse } from "antd"
import styled from "styled-components";
import { FontText } from "../../../atoms/text";
import { theme } from "../../../Theme";
import { LoadingWrapper } from "../../../components/containers";
import { LoadingMask } from "../../../atoms/LoadingMask";
import { Payment } from "./Payment";
import { useEffect, useState } from "react";
import { IOutcome, IPayment } from "../../../@types";
import { PaymentDetails } from "./PaymentDetail";
const { Panel } = Collapse;

const PaymentsContainer = styled.div<{
  reveal: boolean;
}>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  height: 460px;
  width: 100%;
`;

const PanelWrapper = styled.div`
  width: 100%;
  min-height: 460px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const outcome = {
  "id": 6,
  "transaction_type": "current",
  "amount": "2000.0",
  "description": "Heavy Duty Silk Coat",
  "frequency": null,
  "transaction_date": "2024-01-01",
  "quotas": null,
  "discarded_at": null,
  "status": "paid",
  "payments": [
      {
          "id": 5,
          "amount": "2000.0",
          "status": "applied"
      }
  ],
  "billings": [
      {
          "id": 3,
          "name": "Cash",
          "state_date": null,
          "billing_type": "cash"
      }
  ],
  "categories": [
      {
          "id": 1,
          "name": "Games"
      }
  ]
} as IOutcome;

const hardPayment = {
  amount: '2000.00',
  status: 'applied',
  id: 5,
  refund_id: null,
  paymentable: outcome
} as IPayment;

export const Payments = ({
  headerText
}: {
  headerText: string;
}): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [payment, setPayment] = useState<IPayment | null>(null);

  const handlePaymentClick = (payment: IPayment) => {
    setPayment(payment);
    setShowDetail(true);
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setReveal(true);
    }, 2000);
  }, []);

  return(
    <>
      <Collapse
        style={{ margin: '16px 0', backgroundColor: theme.colors.grays.light }}
        defaultActiveKey={['payments']}
        collapsible='disabled'
        expandIcon={() => <></>}
      >
        <Panel header={FontText(headerText)} key='payments' >
          <PanelWrapper>
            {loading
              ? (<LoadingWrapper height='450px'>
                  <LoadingMask />
                </LoadingWrapper>)
              : (<PaymentsContainer reveal={reveal}>
                  <Payment payment={hardPayment} onClick={() => handlePaymentClick(hardPayment)} />
                </PaymentsContainer>
              )
            }
          </PanelWrapper>
        </Panel>
      </Collapse>
      {payment && (<PaymentDetails
        payment={payment}
        open={showDetail}
        close={() => setShowDetail(false)}
      />)}
    </>
  );
};
