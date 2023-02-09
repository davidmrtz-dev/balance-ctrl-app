import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "antd";
import styled from "styled-components";
import { theme } from "../../../Theme";

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 5px;
`;

const CurrentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${p => p.theme.colors.grays.lighter};
  width: 30px;
  border-radius: 10px;
`;

export const Navigation = ({
  currentPage,
  leftClick,
  rightClick
}: {
  currentPage: number;
  leftClick: () => void;
  rightClick: () => void;
}): JSX.Element => {
  return(<NavigationContainer>
    <Button onClick={leftClick}>
      <FontAwesomeIcon
        style={{
          alignSelf: 'flex-end',
          padding: 5
        }}
        color={theme.colors.blacks.normal}
        icon={faChevronLeft}
      />
    </Button>
    <CurrentWrapper>
      <Typography.Text>{currentPage}</Typography.Text>
    </CurrentWrapper>
    <Button onClick={rightClick}>
      <FontAwesomeIcon
        style={{
          alignSelf: 'flex-end',
          padding: 5
        }}
        color={theme.colors.blacks.normal}
        fill={theme.colors.blacks.normal}
        icon={faChevronRight}
      />
    </Button>
  </NavigationContainer>);
};