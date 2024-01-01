import { Collapse } from "antd"
import styled from "styled-components";
import { FontText } from "../../../atoms/text";
import { theme } from "../../../Theme";
import { LoadingWrapper } from "../../../components/containers";
import { LoadingMask } from "../../../atoms/LoadingMask";
import { Payment } from "./Payment";
import { useEffect, useState } from "react";
import { IPayment } from "../../../@types";
const { Panel } = Collapse;

const PanelWrapper = styled.div`
  width: 100%;
  min-height: 460px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PaymentsContainer = styled.div<{
  reveal: boolean;
}>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  height: 460px;
  width: 100%;
`;

const payment = {
  amount: '150.00',
  status: 'applied',
  id: 1,
  refund_id: null
};

export const Payments = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);

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
        <Panel header={FontText('Payments')} key='payments' >
          <PanelWrapper>
            {loading
              ? (<LoadingWrapper height='450px'>
                  <LoadingMask />
                </LoadingWrapper>)
              : (<PaymentsContainer reveal={reveal}>
                  <Payment {...payment as IPayment} />
                </PaymentsContainer>
              )
            }
          </PanelWrapper>
        </Panel>
      </Collapse>
    </>
  );
};
