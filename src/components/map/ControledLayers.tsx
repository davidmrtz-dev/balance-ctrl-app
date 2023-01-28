import {
  LayersControl,
} from 'react-leaflet'
import { LatLngLiteral } from "leaflet";
import { ControledLayer } from './ControledLayer';

export const ControledLayers = ({
  location
}: {
  location: LatLngLiteral
}):JSX.Element => <LayersControl position="topright">
  <ControledLayer
    name='Layer-1'
    location={location}
    color='green'
    fillColor='green'
    radius={2200}
    checked
  />
</LayersControl>;
