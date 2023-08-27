import styled from "styled-components";
import { faMoneyBill1Wave, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "antd";
import { theme } from "../../../Theme";
import { IOutcome } from "../../../@types";
import { formatCurrency } from "../../../utils";
import dayjs from "dayjs";

const OutcomeContainer = styled.div`
  background-color: ${p => p.theme.colors.grays.light};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6em;
  border-radius: 10px;
  margin: 10px 0;
  cursor: pointer;
`;

export const Outcome =({
  item,
  onClick
}: {
  item: IOutcome,
  onClick: () => void;
}): JSX.Element => {
  return (<OutcomeContainer onClick={onClick}>
    <div style={{
      flex: 2,
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
        icon={item.transaction_type === 'current' ? faMoneyBill1Wave : faRepeat}
      />
    </div>
    <div style={{
      flex: 4,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography.Text
        ellipsis
        style={{
        maxWidth: 150,
        ...theme.texts.brandFont,
        textAlign: 'center'
      }}>
        {item.description}
      </Typography.Text>
      <Typography style={{
        ...theme.texts.brandSubFont,
        paddingTop: 5,
        textAlign: 'center'
      }}
      >
        {dayjs(item.transaction_date).format('YYYY-MM-DD')}
      </Typography>
      {item.quotas && <Typography style={{
        ...theme.texts.brandSubFont,
        paddingTop: 5,
        textAlign: 'center'
      }}
      >
        {item.quotas} quotas
      </Typography>}
    </div>
    <div style={{
      flex: 2,
      textAlign: 'center',
      position: 'relative'
    }}>
      <Typography style={{
        ...theme.texts.brandFont
      }}>
        {formatCurrency(item.amount)}
      </Typography>
    </div>
  </OutcomeContainer>);
};
