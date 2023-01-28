import {
  Marker,
  Popup,
  useMapEvents
} from 'react-leaflet'
import { LatLngLiteral } from "leaflet";
// import { ControledLayers } from './ControledLayers';
import { icon } from '../../utils';
import { useEffect } from 'react';

const LocationMarker = ({
  position,
}: {
  position: LatLngLiteral | null;
}): null | JSX.Element => {
  const map = useMapEvents({});

  useEffect(() => {
    if (position) map.flyTo(position, map.getZoom());
  }, [position, map]);

  return position === null ? null : (
    <>
      <Marker position={position} icon={icon}>
        <Popup>You are here</Popup>
      </Marker>
      {/* <ControledLayers location={position}/> */}
    </>
  )
};

export default LocationMarker;
