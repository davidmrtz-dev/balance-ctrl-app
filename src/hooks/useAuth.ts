import { useState } from "react";
import { IUser } from "../@types";
import { Login } from "../@types/IUser";

export const useAuth =  () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = async (params: Login): Promise<void> => {
    try {
      // const result: IUser = await login(params);
      // setUser(result);
      setIsAuthenticated(true);
    } catch (err) {
      throw err;
    }
  };

  const unauthenticate = async (): Promise<void> => {
    // await logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    authenticate,
    unauthenticate
  }
};