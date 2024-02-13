import { Typography } from "antd";
import styled from "styled-components";
import { theme } from "../../Theme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { LoadingMask } from "../../atoms/LoadingMask";
import { LoadingWrapper } from "../containers";
import { useEffect, useState } from "react";

type Variation = 'blue' | 'yellow' | 'gray' | 'green' | 'red' | 'lightRed' | 'orange' | 'lightOrange';

type Variations = {
  [key: string]: {
    background: string;
    color: string;
  }
}

type VariationProps = {
  background: string;
  color: string;
}

const variations: Variations = {
  blue: { background: theme.colors.blues.normal, color: theme.colors.whites.normal },
  yellow: { background: theme.colors.yellows.normal, color: theme.colors.blacks.normal },
  gray: { background: theme.colors.grays.light, color: theme.colors.blacks.normal },
  green: { background: theme.colors.greens.normal, color: theme.colors.blacks.normal },
  red: { background: theme.colors.reds.normal, color: theme.colors.blacks.normal },
  lightRed: { background: theme.colors.reds.light, color: theme.colors.blacks.normal },
  orange: { background: theme.colors.oranges.normal, color: theme.colors.blacks.normal },
  lightOrange: { background: theme.colors.oranges.light, color: theme.colors.blacks.normal }
}

const getVariation = (variation: Variation) => variations[variation];

const CardContainer = styled.div<{
  variation: VariationProps;
  reveal: boolean;
}>`
  background-color: ${p => p.variation.background};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px;
  cursor: ${p => p.onClick ? 'pointer' : 'default'};
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1.2s ease-in-out;
`;

const HeaderCard = ({
  variation,
  concept,
  value,
  onClick,
  loading,
  icon,
  style,
  suffix
}: {
  variation: Variation;
  concept: string;
  value: string;
  onClick?: () => void;
  loading?: boolean;
  icon?: IconDefinition;
  style?: React.CSSProperties;
  suffix?: string;
}): JSX.Element => {
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 100);
  }, [loading]);

  if (loading) return (<LoadingWrapper height='96px'>
    <LoadingMask height={40} width={40} />
  </LoadingWrapper>);

  return (<CardContainer
    variation={getVariation(variation)}
    reveal={reveal}
    onClick={onClick}
    style={style}
  >
    {icon && (<FontAwesomeIcon
      style={{
        alignSelf: 'flex-end',
        padding: 5
      }}
      color={getVariation(variation).color}
      icon={icon}
    />)}
    <Typography style={{
      ...theme.texts.brandFont,
      color: getVariation(variation).color,
    }}>{concept} {icon && (<FontAwesomeIcon style={{
      paddingLeft: 5
    }}
    color={getVariation(variation).color}
    fill={getVariation(variation).background}
    icon={faChevronRight}
  />)}</Typography>
    <Typography style={{
      ...theme.texts.brandFont,
      color: getVariation(variation).color,
    }}>
      {value}{suffix}
    </Typography>
  </CardContainer>);
}

export default HeaderCard;
