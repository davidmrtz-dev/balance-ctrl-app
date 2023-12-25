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

export const LayoutContent = styled.div`
  padding: 0 16px;
`;

export const LoadingWrapper = styled.div<{height?: string}>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${p => p.height || '250px'};
`;

export const AppMainContainer = styled.div`
  background-color: ${props => props.theme.colors.grays.light};
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FormItemWrapper = styled.div`
  border: 1px solid ${props => props.theme.colors.grays.light};
  padding: 4px 11px;
  border-radius: 6px;
  height: 32px;
  display: flex;
  align-items: center;
  width: 100%;
`;

export default LayoutContainer;

export { TransactionContainer } from './TransactionContainer';
export { NavigationContainer } from './NavigationContainer'

