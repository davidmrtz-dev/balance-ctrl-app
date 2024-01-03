import styled from "styled-components";
import { theme } from "../../Theme";
import { OutcomeStatus } from "../../@types";

const StatusCircle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 0 4px;
`;

export const Status = ({ status }: { status: OutcomeStatus }): JSX.Element => {
  const getStatusColor = () => {
    switch (status) {
      case 'hold':
        return theme.colors.grays.normal;
      case 'pending':
        return theme.colors.yellows.normal;
      case 'ok':
        return theme.colors.greens.normal;
      case 'paid':
        return theme.colors.greens.normal;
      case 'expired':
        return theme.colors.reds.normal;
      default:
        return theme.colors.grays.light;
    };
  };

  return (<StatusCircle style={{ backgroundColor: getStatusColor() }} />);
}
