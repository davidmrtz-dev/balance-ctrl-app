import styled from "styled-components";
import { theme } from "../../Theme";

const StatusCircle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 0 4px;
`;

export const Status = ({ status }: { status: string }): JSX.Element => {
  const getStatusColor = () => {
    switch (status) {
      case 'hold':
        return theme.colors.grays.normal;
      case 'pending':
        return theme.colors.yellows.normal;
      case 'applied':
        return theme.colors.greens.normal;
      case 'expired':
        return theme.colors.reds.normal;
      case 'cancelled':
        return theme.colors.reds.normal;
      case 'refund':
        return theme.colors.yellows.normal;
      default:
        return theme.colors.grays.light;
    };
  };

  return (<StatusCircle style={{ backgroundColor: getStatusColor() }} />);
}
