import { Collapse } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { PaymentPages, PaymentsHash } from "../../@types/IPayment";
import { getPayments } from "../../api/core/Payment";
import { LoadingMask } from "../../atoms/LoadingMask";
import { LoadingWrapper } from "../containers";
import { Transaction, TransactionNav } from "./transaction";
const { Panel } = Collapse;

type Category = 'Recent Payments' | 'Fixed Payments' | 'Regular Income' | 'Unfixed Income';

const TransactionsContainer = styled.div<{
  reveal: boolean;
}>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  height: 460px;
`;

const Transactions = ({
  category,
  keepOpen
}: {
  category: Category;
  keepOpen?: boolean;
}): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [payments, setPayments] = useState<PaymentsHash>({});
  const [pages, setPages] = useState<PaymentPages>({ current: 0, fixed: 0});
  const [page, setPage] = useState(1);

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

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 100);
  }, [loading]);

  useEffect(() => {
    const fetchPayments = async (page: number, offset: number): Promise<void> => {
      try {
        const data = await getPayments({ limit: 5, offset: offset});
        setPayments({...payments,  [page]: data.current });
        setPages({ current: data.current_total_pages, fixed: data.fixed_total_pages });
      } catch(error) {
        console.log(error);
      }
    };

    if (page && !payments[page]) {
      setLoading(true);
      setReveal(false);
      fetchPayments(page, (page * 5) - 5);
      setTimeout(() => setLoading(false), 1000);
    }
  }, [page, payments]);

  return(<Collapse
    style={{ margin: '16px 0' }}
    defaultActiveKey={keepOpen ? category : undefined}
  >
    <Panel header={category} key={category} >
      {loading
        ? (<LoadingWrapper height='470px'>
            <LoadingMask />
          </LoadingWrapper>)
        : (<><TransactionsContainer reveal={reveal} id='ttttt'>
            {(payments[page] || []).map(transaction => <Transaction item={transaction} />)}
          </TransactionsContainer>
          <TransactionNav
            leftClick={handleLeftClick}
            rightClick={handleRightClick}
            currentPage={page}
          /></>
        )}
    </Panel>
  </Collapse>);
};

export default Transactions;