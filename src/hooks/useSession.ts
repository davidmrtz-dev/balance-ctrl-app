import { useHistory } from "react-router-dom";
import { ISession } from "../@types";
import { useAuth } from "./useAuth";
import { useEffect, useState, useCallback, useRef } from "react";
import Alert from "../components/alert";

const DEFAULT_SESSION: ISession = {
  timerOn: false,
  timeLeft: 900
};

const getStoredSession = (): ISession => {
  const session = sessionStorage.getItem('UserSession');
  return session ? JSON.parse(session) : DEFAULT_SESSION;
};

export const useSession = () => {
  const { unauthenticate } = useAuth();
  const history = useHistory();
  const [timer, setTimer] = useState<ISession>(getStoredSession);
  const { timerOn, timeLeft } = timer;
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  // Guardar el estado del timer en sessionStorage
  const updateSessionStorage = (newTimer: ISession) => {
    sessionStorage.setItem('UserSession', JSON.stringify(newTimer));
  };

  useEffect(() => {
    if (timerOn) {
      intervalId.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer.timeLeft <= 1) {
            handleSessionExpiration();
            return { ...prevTimer, timeLeft: 0 };
          }

          const updatedTimer = { ...prevTimer, timeLeft: prevTimer.timeLeft - 1 };
          updateSessionStorage(updatedTimer);
          return updatedTimer;
        });
      }, 1000);
    }

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [timerOn]);

  const handleSessionExpiration = useCallback(async () => {
    try {
      resetTimer();
      await unauthenticate();
      history.push('/login');
      Alert({
        icon: 'warning',
        text: 'Your demo session has expired, please log in again.'
      });
    } catch (err: any) {
      Alert({
        icon: 'error',
        text: 'There was an error logging out, please try again later.'
      });
    }
  }, [unauthenticate, history]);

  const resetTimer = useCallback((time: number = DEFAULT_SESSION.timeLeft) => {
    const newTimer = { timerOn: false, timeLeft: time };
    setTimer(newTimer);
    updateSessionStorage(newTimer);
  }, []);

  const beginTimer = useCallback((time: number = DEFAULT_SESSION.timeLeft) => {
    const newTimer = { timerOn: true, timeLeft: time };
    setTimer(newTimer);
    updateSessionStorage(newTimer);
  }, []);

  return {
    timerOn,
    timeLeft,
    beginTimer,
    resetTimer,
  };
};
