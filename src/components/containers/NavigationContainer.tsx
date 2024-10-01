import styled from 'styled-components';

export const NavigationContainer = styled.div<{ flexEnd: boolean}>`
  width: 360px;
  height: 5em;
  background-color: ${props => props.theme.colors.whites.lighter};
  display: flex;
  justify-content: ${props => props.flexEnd ? 'flex-end' : 'space-between'};
  align-items: center;
  padding: 0 30px;
  cursor: default;
  position: fixed;
  top: 0;
  z-index: 999;
  box-shadow: 0 0 5px 0 ${props => props.theme.colors.grays.normal};
`;
