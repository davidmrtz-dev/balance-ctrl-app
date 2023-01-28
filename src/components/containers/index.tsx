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

export default LayoutContainer;
