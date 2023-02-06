import { Typography } from "antd";
import styled from "styled-components";
import { theme } from "../../Theme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faChevronRight, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { LoadingMask } from "../../atoms/LoadingMask";
import { LoadingWrapper } from "../containers";

type Variation = 'data' | 'graph';

const CardContainer = styled.div<{variation: Variation}>`
  min-height: 6em;
  background-color:
    ${p => p.variation === 'data'
      ? p.theme.colors.blues.normal
      : p.theme.colors.yellows.normal };
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px;
  cursor: pointer;
`;

const HeaderCard = ({ variation, concept, amount, loading }: {
  variation: Variation;
  concept: string;
  amount: string
  loading?: boolean;
}): JSX.Element => {

  if (loading) return(<LoadingWrapper height='50px'>
    <LoadingMask height={40} width={40} />
  </LoadingWrapper>);

  return(<CardContainer variation={variation}>
    <FontAwesomeIcon
      style={{
        alignSelf: 'flex-end',
        padding: 5
      }}
      color={variation === 'data' ? theme.colors.whites.normal : theme.colors.blacks.normal}
      fill={variation === 'data' ? theme.colors.whites.normal : theme.colors.blacks.normal}
      icon={variation === 'data' ? faDatabase : faChartPie }
    />
    <Typography style={{
      ...theme.texts.brandSubFont,
      color: variation === 'data' ? theme.colors.whites.normal : theme.colors.blacks.normal
    }}>{concept} <FontAwesomeIcon style={{
      paddingLeft: 5
    }}
    color={variation === 'data' ? theme.colors.whites.normal : theme.colors.blacks.normal}
    fill={variation === 'data' ? theme.colors.whites.normal : theme.colors.blacks.normal}
    icon={faChevronRight}
  /></Typography>
    <Typography style={{
      ...theme.texts.brandFont,
      color: variation === 'data' ? theme.colors.whites.normal : theme.colors.blacks.normal
    }}>$ {amount}</Typography>
  </CardContainer>);
}

export default HeaderCard;