import styled from 'styled-components';

const LayoutContainer = styled.div`
  background:
    linear-gradient(
      25deg,
      ${props => props.theme.colors.whites.lighter} 35%,
      ${props => props.theme.colors.whites.normal} 100%)
    ;
  max-width: 360px;
`;

export const AppMainContainer = styled.div`
  background-color: ${props => props.theme.colors.grays.light};
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

export default LayoutContainer;
