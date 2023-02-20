import { Typography } from "antd";
import styled from "styled-components";
import { theme } from "../../Theme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faChevronRight, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { LoadingMask } from "../../atoms/LoadingMask";
import { LoadingWrapper } from "../containers";
import { useEffect, useState } from "react";

type Variation = 'data' | 'graph';

const CardContainer = styled.div<{
  variation: Variation;
  reveal: boolean;
}>`
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
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1.2s ease-in-out;
`;

const HeaderCard = ({ variation, concept, value, loading }: {
  variation: Variation;
  concept: string;
  value: string
  loading?: boolean;
}): JSX.Element => {
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 100);
  }, [loading]);

  if (loading) return (<LoadingWrapper height='96px'>
    <LoadingMask height={40} width={40} />
  </LoadingWrapper>);

  return (<CardContainer
    variation={variation}
    reveal={reveal}
  >
    <FontAwesomeIcon
      style={{
        alignSelf: 'flex-end',
        padding: 5
      }}
      color={variation === 'data' ? theme.colors.whites.normal : theme.colors.blacks.normal}
      icon={variation === 'data' ? faDatabase : faChartPie }
    />
    <Typography style={{
      ...theme.texts.brandFont,
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
    }}>
      {variation === 'data' && '$'} {value}{variation === 'graph' && '%'}
    </Typography>
  </CardContainer>);
}

export default HeaderCard;