import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse, Typography } from "antd";
import styled from "styled-components";
import { IPayment } from "../../@types";
import { LoadingMask } from "../../atoms/LoadingMask";
import { theme } from "../../Theme";
import { LoadingWrapper } from "../containers";
const { Panel } = Collapse;
const { Text } = Typography;

type Category = 'Recent Payments' | 'Fixed Payments' | 'Regular Income' | 'Unfixed Income';

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
  return(<Collapse
    style={{ margin: '16px 0'}}
    defaultActiveKey={keepOpen ? category : undefined}
  >
    <Panel header={category} key={category} >
      {loading
        ? (<LoadingWrapper>
            <LoadingMask />
          </LoadingWrapper>)
        : (<>
            {(transactions || []).map(transaction => <Transaction item={transaction} />)}
          </>
        )}
    </Panel>
  </Collapse>);
};

const TransactionContainer = styled.div`
  background-color: ${p => p.theme.colors.grays.lighter};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6em;
  border-radius: 10px;
  margin: 10px 0;
  cursor: pointer;
`;

const Transaction = ({ item }: { item: IPayment }): JSX.Element => {
  return(<TransactionContainer>
    <div style={{
      flex: 1,
      display: 'flex',
      justifyContent: 'center'
    }}>
      <FontAwesomeIcon
        style={{
          alignSelf: 'flex-end',
          padding: 5
        }}
        color={theme.colors.blacks.normal}
        fill={theme.colors.blacks.normal}
        icon={faFileInvoice}
      />
    </div>
    <div style={{
      flex: 3,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography style={{
        ...theme.texts.brandFont
      }}
      >
        {item.title}
      </Typography>
      <Text
        ellipsis
        style={{
        maxWidth: 150,
        ...theme.texts.brandSubFont,
      }}>
        {item.description}
      </Text>
    </div>
    <div style={{
      flex: 2,
      textAlign: 'center'
    }}>
      <Typography style={{
        ...theme.texts.brandSubFont
      }}>
        $ {item.amount}
      </Typography>
    </div>
  </TransactionContainer>);
}

export default Transactions;