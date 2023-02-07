import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import styled from "styled-components";
import { theme } from "../../../Theme";

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 5px;
`;

const DotsWrapper = styled.div`
  width: 100%;
  background-color: red;
  display: flex;
  justify-content: center;
`;

export const Navigation = (): JSX.Element => {
  return(<NavigationContainer>
    <Button>
      <FontAwesomeIcon
        style={{
          alignSelf: 'flex-end',
          padding: 5
        }}
        color={theme.colors.blacks.normal}
        fill={theme.colors.blacks.normal}
        icon={faChevronLeft}
      />
    </Button>
    <DotsWrapper>...</DotsWrapper>
    <Button>
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