import { useState } from "react";
import { IUser } from "../@types";
import { Login } from "../@types/IUser";
import { login, logout } from "../api/core/Auth";

export const DEFAULT_USER_AUTH: IUser = { id: 0, email: "" };

const getStoredAuth = (): IUser => {
  const auth = sessionStorage.getItem('UserAuth');
  if (auth) {
    return JSON.parse(auth);
  }
  return DEFAULT_USER_AUTH;
};

export const useAuth =  () => {
  const [user, setUser] = useState<IUser>(DEFAULT_USER_AUTH);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = async (params: Login): Promise<void> => {
    try {
      const result: IUser = await login(params);
      setUser(result);
      sessionStorage.setItem('UserAuth', JSON.stringify(result))
      setIsAuthenticated(true);
    } catch (err) {
      throw err;
    }
  };

  const unauthenticate = async (): Promise<void> => {
    await logout();
    setUser(DEFAULT_USER_AUTH);
    sessionStorage.clear();
    setIsAuthenticated(false);
  };

  const verifyLoggedIn = async (): Promise<void> => {
    return new Promise ((resolve) => {
      const user = getStoredAuth();

      if (!Object.values(user).every(e => !e)) {
        setUser(user);
        setIsAuthenticated(true);
      }

      resolve();
    })
  };

  return {
    user,
    isAuthenticated,
    authenticate,
    unauthenticate,
    verifyLoggedIn
  }
};
