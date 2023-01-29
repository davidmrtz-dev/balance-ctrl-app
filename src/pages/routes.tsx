import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../components/routes/PrivateRoute';
import About from './about';
import Home from './home';
import Login from './login';
import NotFound from './not-found';

const Router = () => {
  return(<Switch>
    <PrivateRoute exact key='home' path='/' component={Home} />
    <Route exact key='login' path='/login' component={Login} />
    <Route exact key='about' path='/about' component={About} />
    <Route exact key='not_found' path='*' component={NotFound} />
  </Switch>);
};

export default Router;