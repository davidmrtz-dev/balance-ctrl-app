import { Collapse } from "antd"
import styled from "styled-components";
import { FontText } from "../../../atoms/text";
import { theme } from "../../../Theme";
import { LoadingWrapper } from "../../../components/containers";
import { LoadingMask } from "../../../atoms/LoadingMask";
import { Payment } from "./Payment";
import { useCallback, useEffect, useRef, useState } from "react";
import { IPayment, IPayments, PaymentsHash } from "../../../@types";
import Alert from "../../../components/alert";
import { PaymentsNavigation } from "../../../components/payments/PaymentsNavigation";
import { PaymentDetail } from "../../../components/payments";
const { Panel } = Collapse;

const PaymentsContainer = styled.div<{
  type: 'applied' | 'pending';
  reveal: boolean;
}>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  width: 100%;
  min-height: ${p => p.type === 'applied' ? '648' : '538'}px;
`;

const PanelWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Payments = ({
  id,
  idPagination,
  headerText,
  getPayments,
  refresh,
  setRefresh,
  type
}: {
  id: string;
  idPagination: string;
  headerText: string;
  getPayments: ({
    page,
    pageSize,
    signal
  }: {
    page: number,
    pageSize: number,
    signal: AbortSignal
  }) => Promise<IPayments>;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
  type: 'applied' | 'pending';
}): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [payments, setPayments] = useState<PaymentsHash>({});
  const [payment, setPayment] = useState<IPayment | null>(null);
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

  const fetchPayments = useCallback(async (page: number): Promise<void> => {
    if (abortController.current) {
      abortController.current.abort();
    }

    const newAbortController = new AbortController();
    abortController.current = newAbortController;

    try {
      const data = await getPayments({
        page,
        pageSize: 5,
        signal: newAbortController.signal
      });

      setPayments(payments => ({...payments, [page]: data.payments }));
      setMeta(data.meta);
      setTimeout(() => setLoading(false), 1500);
    } catch (err: any) {
      if (err === undefined) return;

      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: err.errors || 'There was an error, please try again later'
      }), 1000);
    }
  }, [getPayments]);

  const handlePaymentClick = (payment: IPayment) => {
    setPayment(payment);
    setShowDetail(true);
  }

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  useEffect(() => {
    if (!payments[page]) {
      setLoading(true);
      fetchPayments(page);
    }
  }, [page, payments, fetchPayments]);

  useEffect(() => {
    const handleUpdate = async () => {
      setLoading(true);
      setPayments({});
      await fetchPayments(1);
      setPage(1);
      setRefresh(false);
    };

    if (refresh) {
      handleUpdate();
    }
  }, [refresh, setRefresh, fetchPayments]);

  if (!payments[page]?.length && !loading) return (<></>);

  return(
    <div id={id}>
      <Collapse
        style={{ margin: '16px 0', backgroundColor: theme.colors.grays.light }}
        defaultActiveKey={['payments']}
        collapsible='disabled'
        expandIcon={() => <></>}
      >
        <Panel header={FontText(headerText)} key='payments'>
          <PanelWrapper>
            {loading
              ? (<LoadingWrapper height={type === 'applied' ? '648px' : '538px'}>
                  <LoadingMask />
                </LoadingWrapper>)
              : (<PaymentsContainer type={type} reveal={reveal}>
                  {(payments[page] || []).map(payment =>
                    <Payment payment={payment} onClick={() => handlePaymentClick(payment)} key={payment.id} />
                  )}
                </PaymentsContainer>
              )
            }
          </PanelWrapper>
          <PaymentsNavigation
            id={idPagination}
            currentPage={page}
            leftClick={() => setPage(page - 1)}
            rightClick={() => setPage(page + 1)}
            leftDisabled={page === 1}
            rightDisabled={page === meta.total_pages}
          />
        </Panel>
      </Collapse>
      {payment && (<PaymentDetail
        payment={payment}
        setPayment={setPayment}
        open={showDetail}
        close={() => setShowDetail(false)}
        setRefresh={setRefresh}
      />)}
    </div>
  );
};
