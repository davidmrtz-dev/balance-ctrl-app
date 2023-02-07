import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Collapse } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IPayment } from "../../@types";
import { LoadingMask } from "../../atoms/LoadingMask";
import { theme } from "../../Theme";
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

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 5px;
`;

const DotsWrapper = styled.div`
  width: 100%;
  background-color: red;
  display: flex;
  justify-content: center;
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
            <NavigationContainer>
              <Button>
                <FontAwesomeIcon
                  style={{
                    alignSelf: 'flex-end',
                    padding: 5
                  }}
                  color={theme.colors.blacks.normal}
                  fill={theme.colors.blacks.normal}
                  icon={faChevronLeft}
                />
              </Button>
              <DotsWrapper>...</DotsWrapper>
              <Button>
                <FontAwesomeIcon
                  style={{
                    alignSelf: 'flex-end',
                    padding: 5
                  }}
                  color={theme.colors.blacks.normal}
                  fill={theme.colors.blacks.normal}
                  icon={faChevronRight}
                />
              </Button>
            </NavigationContainer>
          </TransactionsContainer>
        )}
    </Panel>
  </Collapse>);
};

export default Transactions;