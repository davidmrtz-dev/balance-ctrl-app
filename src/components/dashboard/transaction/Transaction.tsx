import styled from "styled-components";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "antd";
import { theme } from "../../../Theme";
import { Outcome } from "../../../@types";
import { formatDate } from "../../../utils";

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

export const Transaction = <T extends Outcome>({ item }: { item: T }): JSX.Element => {
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
        icon={faFileInvoice}
      />
    </div>
    <div style={{
      flex: 3,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography.Text
        ellipsis
        style={{
        maxWidth: 150,
        ...theme.texts.brandSubFont,
      }}>
        {item.description}
      </Typography.Text>
      <Typography style={{
        ...theme.texts.brandFont,
        paddingTop: 5,
        textAlign: 'center'
      }}
      >
        {formatDate(item.purchase_date)}
      </Typography>
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
};
