import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import InitialScreen from "../../atoms/InitialScreen";
import Alert from "../alert";
import LayoutContainer, { LayoutContent } from "../containers";
import Navigation from "../navigation";
import styled from "styled-components";
import { useSessionContext } from "../../context/SessionContext";
import SessionTimer from "../session";

const Offset = styled.div`
  width: 360px;
  height: 5em;
  background-color: ${props => props.theme.colors.whites.lighter};
  padding: 0 30px;
`;

const Layout = ({ children }: {children: React.ReactNode }): JSX.Element => {
  const [showInit, setShowInit] = useState(true);
  const { verifyLoggedIn, isAuthenticated, unauthenticate } = useAuthContext();
  const { timerOn, timeLeft, showSessionAlert, setShowSessionAlert, resetTimer } = useSessionContext();
  const history = useHistory();

  useEffect(() => {
    const verify = async (): Promise<void> => {
      try {
        await verifyLoggedIn();
      } catch (err: any) {
        setTimeout(() => {
          const error = err.errors && err.errors.length && err.errors[0];
          Alert({
            icon: 'error',
            text: (error || 'There was an error, please try again later.'),
          });
        }, 1000);
      }
    }

    verify();

    setTimeout(() => {
      setShowInit(false);
    }, 2000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthenticated) history.push('/');
  }, [isAuthenticated, history]);

  useEffect(() => {
    const handleSessionExpiration = async () => {
      if (showSessionAlert) {
        Alert({
          icon: 'warning',
          text: 'Your demo session has expired, please log in again.'
        });
        await unauthenticate();
        setShowSessionAlert(false);
        resetTimer();
        history.push('/login');
      }
    }

    handleSessionExpiration();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSessionAlert]);

  return (
    <LayoutContainer>
      <InitialScreen open={showInit} />
      <Offset />
      <Navigation />
      <LayoutContent>
        {children}
      </LayoutContent>
      {timerOn && <SessionTimer timeLeft={timeLeft} />}
    </LayoutContainer>
  )
};

export default Layout;
