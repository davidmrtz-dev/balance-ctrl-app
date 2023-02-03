import styled from 'styled-components';

export const NavigationContainer = styled.div`
  width: 360px;
  height: 5em;
  background-color: ${props => props.theme.colors.whites.lighter};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  cursor: default;
`;
