import LayoutContainer from "../containers";
import Navigation from "../navigation";

const Layout = ({ children }: {children: React.ReactNode }): JSX.Element => {
  return(
    <LayoutContainer>
      <Navigation />
      {children}
    </LayoutContainer>
  )
};

export default Layout;