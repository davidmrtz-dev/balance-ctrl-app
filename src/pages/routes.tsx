import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import PrivateRoute from '../components/routes/PrivateRoute';
import { IAuthContext, useAuthContext } from '../context/AuthContext';
import About from './about';
import Home from './home';
import Login from './login';
import Outcomes from './outcomes';

const GeneralRoute = (_props: RouteProps, auth: IAuthContext) => (
  <Route exact key='default' path='*'>
    {
      auth.isAuthenticated
        ? <Redirect to='/' />
        : <Redirect to='/login' />
    }
  </Route>
);

const Router = (props: RouteProps) => {
  const auth = useAuthContext();

  return (<Switch>
    <PrivateRoute exact key='home' path='/' component={Home} />
    <PrivateRoute exact key='outcomes' path='/outcomes' component={Outcomes} />
    <Route exact key='login' path='/login' component={Login} />
    <Route exact key='about' path='/about' component={About} />
    {GeneralRoute(props, auth)}
  </Switch>);
};

export default Router;