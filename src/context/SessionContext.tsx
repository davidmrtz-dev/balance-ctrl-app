import { createContext, useContext, ReactNode } from "react";
import { useSession } from "../hooks/useSession";

export interface ISessionContext {
  timeLeft: number;
  timerOn: boolean;
  resetTimer: (time?: number) => void;
  beginTimer: (time?: number) => void;
}

export const sessionContext = createContext<ISessionContext>({
  timeLeft: 0,
  timerOn: false,
  resetTimer: () => {},
  beginTimer: () => {}
});

export const useSessionContext = () => useContext(sessionContext);

const { Provider } = sessionContext;

export const SessionProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const { timerOn, timeLeft, beginTimer, resetTimer } = useSession();

  return (
    <Provider value={{ timerOn, timeLeft, beginTimer, resetTimer  }}>
      {children}
    </Provider>
  );
};
