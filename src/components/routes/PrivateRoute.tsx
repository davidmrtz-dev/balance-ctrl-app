import { ComponentType } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

type PrivateRouteProps = RouteProps & {
  backPrevious?: boolean;
  redirectTo?: string;
  component?: ComponentType;
}

export default function PrivateRoute({ children, component: Component, ...rest }: PrivateRouteProps) {
  const { backPrevious = false, redirectTo = '/login' } = rest;
  const auth = useAuthContext();

  return (
    <Route {...rest} render={(props) => {
      return auth.isAuthenticated
        ? children as JSX.Element || (Component &&  <Component {...props} />)
        : <Redirect to={{
          pathname: redirectTo,
          state: { from: props.location, backPrevious }
        }} />
    }}/>
  );
}
