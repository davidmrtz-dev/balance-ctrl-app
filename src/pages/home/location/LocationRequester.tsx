import { Drawer } from 'antd';
import { LatLngLiteral } from 'leaflet';
import { useEffect } from 'react';
import { LoadingMask } from '../../../atoms/LoadingMask';
import { theme } from '../../../Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUmbrella } from '@fortawesome/free-solid-svg-icons';

export const LocationRequester = ({
  open,
  setPosition
}: {
  open: boolean;
  setPosition: (newPos: LatLngLiteral) => void;
}): JSX.Element => {

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    } else {
      // TODO: Set a default center
    }
  }, [setPosition]);

  return(<Drawer
    placement={'left'}
    open={open}
    key={'top'}
    closable={false}
    style={{
      width: 360,
      height: '100%',
      position: 'absolute',
      left: 0,
      right: 0,
      marginLeft: 'auto',
      marginRight: 'auto'
    }}
    bodyStyle={{
      background:`
        linear-gradient(
          25deg,
          ${theme.colors.blues.transitionBlue} 35%,
          ${theme.colors.blues.fancyBlue} 100%)
      `,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    contentWrapperStyle={{
      width: '100%',
      boxShadow: 'none'
    }}
  >
    <FontAwesomeIcon
      color={theme.colors.lighterWhite}
      fill={theme.colors.lighterWhite}
      size='3x'
      icon={faUmbrella}
      style={{ zIndex: 1000 }}
    />
    <LoadingMask fixed />
  </Drawer>
  );
};
