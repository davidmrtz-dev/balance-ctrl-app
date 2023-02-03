import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { ThemeProvider } from 'styled-components';
import Layout from './components/layouts/Layout';
import Helmet from 'react-helmet';
import { theme } from './Theme';
import 'antd/dist/reset.css';
import './assets/css/App.css';
import Router from "./pages/routes";
import { AppMainContainer } from "./components/containers";
import { AuthProvider } from "./context/AuthContext";
import { ConfigProvider } from "antd";

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();
const engine = new Styletron();

const App = (): JSX.Element =>
<ConfigProvider theme={{
  token: {
    colorPrimary: theme.colors.blues.normal,
    colorPrimaryHover: theme.colors.blues.darker
  }
}}>
  <StyletronProvider
    value={engine}
    debug={debug}
    debugAfterHydration
  >
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppMainContainer>
          <Layout>
            <Helmet>
              <title>Balance Ctrl</title>
              <meta
                name="description"
                content="App that helps you take control of your finances."
              />
            </Helmet>
            <Router />
          </Layout>
        </AppMainContainer>
      </AuthProvider>
    </ThemeProvider>
  </StyletronProvider>
</ConfigProvider>

export default App;
