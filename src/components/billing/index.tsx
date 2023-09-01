import styled from "styled-components";
import { theme } from "../../Theme";
import { IBilling } from "../../@types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { SubFontText } from "../../atoms/text";
import dayjs from "dayjs";
import { capitalizeFirst } from "../../utils";

const BillingWrapper = styled.div`
  display: flex;
  padding: 4px 11px;
  border-radius: 6px;
  background-color: ${theme.colors.whites.normal};
  border: 1px solid ${theme.colors.grays.light};
  justify-content: space-around;
`;

const BillingIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  flex: 1;
`;

const BillingDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

const BillingRowWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const BillingRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BillinfInformation = (billing: IBilling): JSX.Element => {
  return (<BillingWrapper>
    <BillingIconWrapper>
      <FontAwesomeIcon icon={faCreditCard} style={{ color: theme.colors.blues.normal }} size="3x"/>
    </BillingIconWrapper>
    <BillingDataWrapper>
      <BillingRow>
        <BillingRowWrapper>
          {SubFontText('Card Name: ')}
        </BillingRowWrapper>
        <BillingRowWrapper>
          {SubFontText(billing.name)}
        </BillingRowWrapper>
      </BillingRow>
      <BillingRow>
        <BillingRowWrapper>
          {SubFontText('State Date: ')}
        </BillingRowWrapper>
        <BillingRowWrapper>
          {SubFontText(dayjs(billing.state_date).format('YYYY-MM-DD'))}
        </BillingRowWrapper>
      </BillingRow>
      <BillingRow>
        <BillingRowWrapper>
          {SubFontText('Card Type: ')}
        </BillingRowWrapper>
        <BillingRowWrapper>
          {SubFontText(capitalizeFirst(billing.card_type))}
        </BillingRowWrapper>
      </BillingRow>
    </BillingDataWrapper>
  </BillingWrapper>);
};

export default BillinfInformation;
