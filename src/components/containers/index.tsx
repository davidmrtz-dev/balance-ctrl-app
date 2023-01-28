import styled from 'styled-components';

const LayoutContainer = styled.div`
  background:
    linear-gradient(
      25deg,
      ${props => props.theme.colors.blues.transitionBlue} 35%,
      ${props => props.theme.colors.blues.fancyBlue} 100%)
    ;
  max-width: 360px;
`;

export const MainContainer = styled.div`
  background-color: ${props => props.theme.colors.grays.light};
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

export default LayoutContainer;
