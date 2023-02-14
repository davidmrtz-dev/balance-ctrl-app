import { createContext, useContext, ReactNode } from "react";
import { IUser, Login } from "../@types";
import { useAuth } from "../hooks/useAuth";

export interface IAuthContext {
  user: IUser | null;
  isAuthenticated: boolean;
  authenticate: (params: Login) => Promise<void>;
  unauthenticate: () => Promise<void>;
  verifyLoggedIn: () => Promise<void>;
}

export const authContext = createContext<IAuthContext>({
  user: null,
  isAuthenticated: false,
  authenticate: async () => {},
  unauthenticate: async () => {},
  verifyLoggedIn: async () => {}
});

export const useAuthContext = () => useContext(authContext);

const { Provider } = authContext;

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const { user, isAuthenticated, authenticate, unauthenticate, verifyLoggedIn } = useAuth();

  return (
    <Provider value={{ user, isAuthenticated, authenticate, unauthenticate, verifyLoggedIn }}>
      {children}
    </Provider>
  );
};