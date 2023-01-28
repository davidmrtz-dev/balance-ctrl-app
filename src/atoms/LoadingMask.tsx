import React from 'react';
import ReactLoadingR, { LoadingProps } from 'react-loading';
import styled from 'styled-components';
import { theme } from '../Theme';

interface ReactLoadingFix extends React.Component<LoadingProps> {};

const ReactLoading = (ReactLoadingR as any) as {
  new () : ReactLoadingFix;
};

const Mask = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const LoadingMask = (props: {
  fixed?: boolean;
  height?: number;
  width?: number;
}): JSX.Element => <Mask style={{
  position: props.fixed ? 'fixed' : 'static',
  backdropFilter: props.fixed ? 'brightness(75%)' : 'none'
}}>
  <ReactLoading
    type='spin'
    color={theme.colors.lighterWhite}
    height={props.height || 90}
    width={props.width || 90}
  />
</Mask>