import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { ThemeProvider } from 'styled-components';
import Layout from './components/layouts/Layout';
import Helmet from 'react-helmet';
import { theme } from './Theme';
import 'antd/dist/reset.css';
import './assets/css/App.css';
import Router from "./pages/routes";
import { MainContainer } from "./components/containers";

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
              <meta
                name="description"
                content="App that helps you take control of your finances."
              />
            </Helmet>
            <Router />
          </Layout>
        </MainContainer>
      </ThemeProvider>
    </StyletronProvider>
  );
};

export default App;
