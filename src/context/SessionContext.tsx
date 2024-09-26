import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import Alert from "../components/alert";

const DEFAULT_SESSION_TIME = 1800;

export interface ISessionContext {
  timeLeft: number;
  timerOn: boolean;
  resetTimer: (time?: number) => void;
  beginTimer: (time?: number) => void;
  showSessionAlert: boolean;
  setShowSessionAlert: (show: boolean) => void;
}

export const sessionContext = createContext<ISessionContext>({
  timeLeft: DEFAULT_SESSION_TIME,
  timerOn: false,
  resetTimer: () => {},
  beginTimer: () => {},
  showSessionAlert: false,
  setShowSessionAlert: () => {}
});

export const useSessionContext = () => useContext(sessionContext);

const { Provider } = sessionContext;

export const SessionProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [timerOn, setTimerOn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SESSION_TIME);
  const [showSessionAlert, setShowSessionAlert] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (timerOn) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            handleSessionExpiration();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [timerOn]);

  const handleSessionExpiration = async () => {
    try {
      setShowSessionAlert(true);
    } catch (err: any) {
      Alert({
        icon: 'error',
        text: 'There was an error logging out, please try again later.'
      });
    }
  };

  const resetTimer = (time: number = DEFAULT_SESSION_TIME) => {
    setTimeLeft(time);
    setTimerOn(false);
  };

  const beginTimer = (time: number = DEFAULT_SESSION_TIME) => {
    setTimeLeft(time);
    setTimerOn(true);
  };

  return (
    <Provider value={{ timerOn, timeLeft, resetTimer, beginTimer, showSessionAlert, setShowSessionAlert }}>
      {children}
    </Provider>
  );
};
