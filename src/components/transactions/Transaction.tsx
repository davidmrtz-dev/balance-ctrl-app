import styled from "styled-components";
import { faEdit, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "antd";
import { theme } from "../../Theme";
import { IOutcome } from "../../@types";
import { formatCurrency, formatViewDate } from "../../utils";

const TransactionContainer = styled.div`
  background-color: ${p => p.theme.colors.grays.lighter};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6em;
  border-radius: 10px;
  margin: 10px 0;
  cursor: default;
`;

export const Transaction = <T extends IOutcome>({
  item,
  onClick
}: {
  item: T,
  onClick: () => void;
}): JSX.Element => {
  return (<TransactionContainer>
    <div style={{
      flex: 1,
      display: 'flex',
      justifyContent: 'center'
    }}>
      <FontAwesomeIcon
        style={{
          alignSelf: 'flex-end',
          paddingLeft: 15
        }}
        color={theme.colors.grays.darker}
        size='2x'
        icon={faMoneyBill1Wave}
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
        textAlign: 'center'
      }}>
        {item.description}
      </Typography.Text>
      <Typography style={{
        ...theme.texts.brandFont,
        paddingTop: 5,
        textAlign: 'center'
      }}
      >
        {formatViewDate(item.purchase_date)}
      </Typography>
    </div>
    <div style={{
      flex: 2,
      textAlign: 'center',
      position: 'relative'
    }}>
      <FontAwesomeIcon
        onClick={onClick}
        style={{
          position: 'absolute',
          top: -25,
          right: 10,
          cursor: 'pointer'
        }}
        color={theme.colors.blacks.normal}
        icon={faEdit}
      />
      <Typography style={{
        ...theme.texts.brandSubFont
      }}>
        {formatCurrency(item.amount)}
      </Typography>
    </div>
  </TransactionContainer>);
};
