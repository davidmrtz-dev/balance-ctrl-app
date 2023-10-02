import React from 'react';
import ReactLoadingR, { LoadingProps } from 'react-loading';
import styled from 'styled-components';
import { theme } from '../Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

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
  filter?: boolean;
  withIcon?: boolean;
  iconSize?: SizeProp;
}): JSX.Element => <Mask style={{
  position: props.fixed ? 'fixed' : 'static',
  backdropFilter: props.filter ? 'brightness(75%)' : 'none'
}}>
  <ReactLoading
    type='spin'
    color={theme.colors.grays.normal}
    height={props.height || 90}
    width={props.width || 90}
  />
  {props.withIcon && <FontAwesomeIcon
    color={theme.colors.grays.normal}
    size={props.iconSize}
    icon={faBalanceScale}
    style={{ zIndex: 1000, position: 'absolute' }}
  />}
</Mask>
