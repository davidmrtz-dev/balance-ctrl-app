import { Collapse } from "antd";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { IPayments, PaymentPages, PaymentsHash } from "../../@types";
import { LoadingMask } from "../../atoms/LoadingMask";
import { theme } from "../../Theme";
import { LoadingWrapper } from "../containers";
import { Transaction, TransactionNav } from "./transaction";
const { Panel } = Collapse;

type Category = 'Recent Payments' | 'Fixed Payments' | 'Regular Income' | 'Unfixed Income';

type BtnStatus = {
  left: boolean;
  right: boolean;
};

const TransactionsContainer = styled.div<{
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

const Transactions = ({
  category,
  keepOpen,
  fetchData
}: {
  category: Category;
  keepOpen?: boolean;
  fetchData: (offset: number) => Promise<IPayments>;
}): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [payments, setPayments] = useState<PaymentsHash>({});
  const [pages, setPages] = useState<PaymentPages>({ current: 0, fixed: 0});
  const [page, setPage] = useState(1);
  const [disableBtns, setDisableBtns] = useState<BtnStatus>({ left: false, right: false });

  const handleLeftClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleRightClick = () => {
    if (page < pages.current) {
      setPage(page + 1);
    }
  };

  const handleBlock = useCallback(() => {
    if (!loading) {
      if (page === 1) {
        setDisableBtns({ left: true, right: false });
      } else if (page === pages.current) {
        setDisableBtns({ left: false, right: true });
      } else {
        setDisableBtns({ left: false, right: false });
      }
    } else {
      setDisableBtns({ left: true, right: true });
    }
  }, [loading, page, pages]);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 100);
  }, [loading]);

  useEffect(() => {
    const fetchPayments = async (page: number, offset: number): Promise<void> => {
      try {
        setLoading(true);
        const data = await fetchData(offset);
        if (data) {
          setPayments({...payments,  [page]: data.payments });
          setPages({ current: data.total_pages, fixed: data.total_pages });
          setTimeout(() => setLoading(false), 1000);
        }
      } catch(error) {
        Swal.fire({
          icon: 'error',
          title: 'Ops!',
          text: 'There was an error, please try again later.',
          width: 360,
          color: theme.colors.blacks.normal,
          confirmButtonColor: theme.colors.blues.normal
        });
      }
    };

    if (page && !payments[page]) {
      setReveal(false);
      fetchPayments(page, (page * 5) - 5);
    }
  }, [page, payments, fetchData]);

  useEffect(() => {
    handleBlock();
  }, [page, handleBlock]);

  return(<Collapse
    style={{ margin: '16px 0' }}
    defaultActiveKey={keepOpen ? category : undefined}
  >
    <Panel header={category} key={category} >
      <PanelWrapper>
        {loading
          ? (<LoadingWrapper height='450px'>
              <LoadingMask />
            </LoadingWrapper>)
          : (<TransactionsContainer reveal={reveal} id='ttttt'>
              {(payments[page] || []).map(transaction => <Transaction key={transaction.id} item={transaction} />)}
            </TransactionsContainer>
          )
        }
      </PanelWrapper>
      <TransactionNav
        leftClick={handleLeftClick}
        rightClick={handleRightClick}
        leftDisabled={disableBtns.left}
        rightDisabled={disableBtns.right}
        currentPage={page}
      />
    </Panel>
  </Collapse>);
};

export default Transactions;