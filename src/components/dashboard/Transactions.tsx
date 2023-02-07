import { Collapse } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IPayment } from "../../@types";
import { LoadingMask } from "../../atoms/LoadingMask";
import { LoadingWrapper } from "../containers";
import Transaction from "./Transaction";
const { Panel } = Collapse;

type Category = 'Recent Payments' | 'Fixed Payments' | 'Regular Income' | 'Unfixed Income';

const TransactionsContainer = styled.div<{
  reveal: boolean;
}>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1.5s ease-in-out;
`;

const Transactions = ({
  category,
  keepOpen,
  loading,
  transactions
}: {
  category: Category;
  transactions: IPayment [];
  keepOpen?: boolean;
  loading?: boolean;
}): JSX.Element => {
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 100);
  }, [loading]);

  return(<Collapse
    style={{ margin: '16px 0'}}
    defaultActiveKey={keepOpen ? category : undefined}
  >
    <Panel header={category} key={category} >
      {loading
        ? (<LoadingWrapper height='470px'>
            <LoadingMask />
          </LoadingWrapper>)
        : (<TransactionsContainer reveal={reveal}>
            {(transactions || []).map(transaction => <Transaction item={transaction} />)}
          </TransactionsContainer>
        )}
    </Panel>
  </Collapse>);
};

export default Transactions;