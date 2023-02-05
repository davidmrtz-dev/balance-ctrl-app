import { Typography } from "antd";
import styled from "styled-components";
import { theme } from "../../Theme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

const CardContainer = styled.div`
  min-height: 6em;
  background-color: red;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px;
`;

const HeaderCard = (): JSX.Element => {
  return(<CardContainer>
    <FontAwesomeIcon
      style={{
        alignSelf: 'flex-end',
        padding: 5
      }}
      color={theme.colors.blacks.normal}
      fill={theme.colors.blacks.normal}
      size='1x'
      icon={faDatabase}
    />
    <Typography style={{
      ...theme.texts.brandSubFont
    }}>{'Income >'}</Typography>
    <Typography style={{
      ...theme.texts.brandFont
    }}>$ 1,000,000</Typography>
  </CardContainer>);
}

export default HeaderCard;