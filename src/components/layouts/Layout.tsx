import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Alert from "../alert";
import LayoutContainer, { LayoutContent } from "../containers";
import Navigation from "../navigation";

const Layout = ({ children }: {children: React.ReactNode }): JSX.Element => {
  const auth = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    const verify = async(): Promise<void> => {
      try {
        await auth.verifyLoggedIn();
      } catch (err: any) {
        setTimeout(() => {
          const error = err.errors && err.errors.length && err.errors[0];
          Alert({
            icon: 'error',
            text: (error || 'There was an error, please try again.'),
          });
        }, 1000);
      }
    }

    verify();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) history.push('/');
  }, [auth.isAuthenticated, history])

  return (
    <LayoutContainer>
      <Navigation />
      <LayoutContent>
        {children}
      </LayoutContent>
    </LayoutContainer>
  )
};

export default Layout;