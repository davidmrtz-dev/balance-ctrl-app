import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store';
import { GlobalStyle } from "./GlobalStyle";
import Counter from './features/counter/Counter';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Cargando...</div>} persistor={persistor}>
        <GlobalStyle />
        <BrowserRouter>
          <App />
          {/* <Counter /> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>, document.getElementById('root')
);
