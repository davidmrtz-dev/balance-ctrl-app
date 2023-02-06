import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import LayoutContainer, { LayoutContent } from "../containers";
import Navigation from "../navigation";

const Layout = ({ children }: {children: React.ReactNode }): JSX.Element => {
  const auth = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    const verify = async(): Promise<void> => {
      try {
        await auth.verifyLoggedIn();
      } catch(err) {
        console.log(err);
      }
    }

    verify();
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) history.push('/');
  }, [auth.isAuthenticated, history])

  return(
    <LayoutContainer>
      <Navigation />
      <LayoutContent>
        {children}
      </LayoutContent>
    </LayoutContainer>
  )
};

export default Layout;