import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "antd";
import { theme } from "../../../Theme";
import { IOutcome } from "../../../@types";
import { billingIcon, formatCurrency } from "../../../utils";
import dayjs from "dayjs";
import { Status } from "../../outcomes/Status";

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

const OutcomeIcon = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-left: 15px;
`;

const OutcomeDetails = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AmountContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 80%;
  text-align: center;
  position: relative;
`;

export const Outcome = ({
  item,
  onClick
}: {
  item: IOutcome;
  onClick: () => void;
}): JSX.Element => {
  return (
    <OutcomeContainer onClick={onClick}>
      <OutcomeIcon>
        <FontAwesomeIcon
          color={theme.colors.grays.darker}
          size="2x"
          icon={billingIcon(item.billings[0].billing_type)}
        />
      </OutcomeIcon>
      <OutcomeDetails>
        <Typography.Text
          ellipsis
          style={{
            maxWidth: 150,
            ...theme.texts.brandFont,
            textAlign: "center"
          }}
        >
          {item.description}
        </Typography.Text>
        <Typography
          style={{
            ...theme.texts.brandSubFont,
            paddingTop: 5,
            textAlign: "center"
          }}
        >
          {dayjs(item.transaction_date).format("YYYY-MM-DD")}
        </Typography>
        {item.transaction_type === 'fixed' && (
          <Typography
            style={{
              ...theme.texts.brandSubFont,
              paddingTop: 5,
              textAlign: "center"
            }}
          >
            {item.quotas} quotas
          </Typography>
        )}
      </OutcomeDetails>
      <AmountContainer>
        <Status status={item.status} />
        <Typography style={{ ...theme.texts.brandFont }}>
          {formatCurrency(item.amount)}
        </Typography>
      </AmountContainer>
    </OutcomeContainer>
  );
};
