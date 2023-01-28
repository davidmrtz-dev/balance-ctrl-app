import { Routes, Route } from 'react-router-dom';
import About from './about';
import Home from './home';
import NotFound from './not-found';

const Router = () => {
  return(<Routes>
    <Route path='/' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='*' element={<NotFound />} />
  </Routes>);
};

export default Router;