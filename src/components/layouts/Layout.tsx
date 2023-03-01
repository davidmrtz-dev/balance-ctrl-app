import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import InitialScreen from "../../atoms/InitialScreen";
import Alert from "../alert";
import LayoutContainer, { LayoutContent } from "../containers";
import Navigation from "../navigation";

const Layout = ({ children }: {children: React.ReactNode }): JSX.Element => {
  const [showInit, setShowInit] = useState(true);
  const auth = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    const verify = async (): Promise<void> => {
      try {
        await auth.verifyLoggedIn();
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
    if (auth.isAuthenticated) history.push('/');
  }, [auth.isAuthenticated, history])

  return (
    <LayoutContainer>
      <InitialScreen open={showInit} />
      <Navigation />
      <LayoutContent>
        {children}
      </LayoutContent>
    </LayoutContainer>
  )
};

export default Layout;