import { Routes, Route } from 'react-router-dom';
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import styled, { ThemeProvider } from 'styled-components';
import Layout from './components/layouts/Layout';
import Helmet from 'react-helmet';
import NotFound from './pages/not-found';
import About from './pages/about';
import Home from './pages/home';
import { theme } from './Theme';
import 'antd/dist/reset.css';
import './assets/css/App.css';
const MainContainer = styled.div`
  background-color: ${props => props.theme.colors.grays.light};
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();
const engine = new Styletron();

const App = (): JSX.Element => {
  return(
    <StyletronProvider value={engine} debug={debug} debugAfterHydration>
      <ThemeProvider theme={theme}>
        <MainContainer>
          <Layout>
            <Helmet>
              <title>Weather App</title>
              <meta name="description" content="App that let you know the weather with map's functionality" />
            </Helmet>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Layout>
        </MainContainer>
      </ThemeProvider>
    </StyletronProvider>
  );
};

export default App;
