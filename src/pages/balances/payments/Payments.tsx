import { Collapse } from "antd"
import styled from "styled-components";
import { FontText } from "../../../atoms/text";
import { theme } from "../../../Theme";
import { LoadingWrapper } from "../../../components/containers";
import { LoadingMask } from "../../../atoms/LoadingMask";
import { Payment } from "./Payment";
import { useCallback, useEffect, useRef, useState } from "react";
import { IPayment } from "../../../@types";
import { PaymentDetails } from "./PaymentDetail";
import Alert from "../../../components/alert";
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

export const Payments = ({
  headerText,
  getPayments
}: {
  headerText: string;
  getPayments: ({
    page,
    pageSize,
    signal
  }: {
    page: number,
    pageSize: number,
    signal: AbortSignal
  }) => Promise<{
    payments: IPayment [],
    meta: {
      current_page: number,
      per_page: number,
      total_pages: number,
      total_per_page: number
    }
  }>;
}): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [payment, setPayment] = useState<IPayment | null>(null);
  const [payments, setPayments] = useState<IPayment []>([]);
  const [page, setPage] = useState<number>(1);
  const [meta, setMeta] = useState<{
    current_page: number,
    per_page: number,
    total_pages: number,
    total_per_page: number
  }>({
    current_page: 0,
    per_page: 0,
    total_pages: 0,
    total_per_page: 0
  });
  const abortController = useRef<AbortController | null>(null);

  const fetchPayments = useCallback(async (): Promise<void> => {
    if (page > 1) setLoadMore(true);

    if (abortController.current) {
      abortController.current.abort();
    }

    const newAbortController = new AbortController();
    abortController.current = newAbortController;

    try {
      const data = await getPayments({
        page,
        pageSize: 10,
        signal: newAbortController.signal
      });

      if (page > 1) {
        setPayments(payments => [...payments, ...data.payments]);
        setMeta(data.meta);
      } else {
        setPayments(data.payments);
        setMeta(data.meta);
      }
      setTimeout(() => {
        setLoading(false);
        setLoadMore(false);
      }, 1500);
    } catch (err: any) {
      if (err === undefined) return;

      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: err.error || 'There was an error, please try again later'
      }), 1000);
    }
  }, [page, getPayments]);

  const handlePaymentClick = (payment: IPayment) => {
    setPayment(payment);
    setShowDetail(true);
  }

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

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
                  {(payments || []).map(payment =>
                    <Payment payment={payment} onClick={() => handlePaymentClick(payment)} key={payment.id} />
                  )}
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
