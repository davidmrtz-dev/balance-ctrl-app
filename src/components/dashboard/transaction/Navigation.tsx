import { faChevronLeft, faChevronRight, faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import styled from "styled-components";
import { NavigationStatus } from "../../../@types";
import { theme } from "../../../Theme";
import { parsedInt } from "../../../utils";

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 5px;
`;

export const Navigation = ({ status }: { status: NavigationStatus }): JSX.Element => {
  return(<NavigationContainer>
    <Button>
      <FontAwesomeIcon
        style={{
          alignSelf: 'flex-end',
          padding: 5
        }}
        color={theme.colors.blacks.normal}
        icon={faChevronLeft}
      />
    </Button>
    <Dots status={status} />
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

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dots = ({ status }: { status: NavigationStatus }): JSX.Element => {
  return(<DotsContainer>
    {(Object.keys(status) || []).map(dotKey =>
      <Dot active={status[parsedInt(dotKey) as keyof typeof status]} />
    )}
  </DotsContainer>);
};

const Dot = ({ active }: { active: boolean}): JSX.Element => <FontAwesomeIcon
  style={{
    alignSelf: 'flex-end',
    padding: 5
  }}
  color={active ? theme.colors.blacks.normal : theme.colors.grays.normal}
  icon={faDotCircle}
/>