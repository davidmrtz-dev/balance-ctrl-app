import { Typography } from "antd";
import { theme } from "../../Theme";
import styled from "styled-components";

interface SessionTimerProps {
  timeLeft: number;
}

const SessionContainer = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1002;
  width: 360px;
  background-color: rgba(173, 216, 230, 0.8);
  text-align: center;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  user-select: none;
`;

const SessionTimer: React.FC<SessionTimerProps> = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <SessionContainer>
      {minutes > 0 ? (
        <Typography
          style={{
            ...theme.texts.brandFont,
            textAlign: "center"
          }}
        >
          Demo session expire in: {minutes} min{minutes > 1 ? 's' : ''}, {seconds} second{seconds !== 1 ? 's' : ''}
        </Typography>
      ) : (
        <Typography
          style={{
            ...theme.texts.brandFont,
            textAlign: "center"
          }}
        >
          Demo session expire in: {seconds} second{seconds !== 1 ? 's' : ''}
        </Typography>
      )}
    </SessionContainer>
  );
};

export default SessionTimer;
