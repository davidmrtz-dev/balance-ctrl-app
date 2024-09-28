import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store';
import { GlobalStyle } from "./GlobalStyle";
import { PersistGate } from 'redux-persist/integration/react';
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
import { SessionProvider } from "./context/SessionContext";
import { AuthProvider } from "./context/AuthContext";
import { ConfigProvider } from "antd";

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();
const engine = new Styletron();

const App = (): JSX.Element =>
<Provider store={store}>
  <PersistGate loading={<div>Cargando...</div>} persistor={persistor}>
    <GlobalStyle />
    <BrowserRouter>
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
              <SessionProvider>
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
              </SessionProvider>
            </AuthProvider>
          </ThemeProvider>
        </StyletronProvider>
      </ConfigProvider>
    </BrowserRouter>;
  </PersistGate>
</Provider>;

export default App;
