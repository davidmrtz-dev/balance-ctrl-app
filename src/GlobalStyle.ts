import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0px;
    padding: 0px;
  }
  body {
    font-family: 'Noto-Sans', sans-serif;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    max-width: 100%;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  .ant-typography {
    margin: 0;
  }
  @media print
  {
    .no-print, .no-print *
    {
      display: none !important;
    }
  }
`;
