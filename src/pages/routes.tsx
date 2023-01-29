import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../components/routes/PrivateRoute';
import About from './about';
import Home from './home';
import Login from './login';
import NotFound from './not-found';

const Router = () => {
  return(<Switch>
    <PrivateRoute exact key='home' path='/' component={Home} />
    <Route path='/login' component={Login} />
    <Route path='/about' component={About} />
    <Route path='*' component={NotFound} />
  </Switch>);
};

export default Router;