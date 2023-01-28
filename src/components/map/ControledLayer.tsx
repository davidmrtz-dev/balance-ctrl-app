import {
  LayersControl,
  Circle,
  FeatureGroup,
} from 'react-leaflet'
import { LatLngLiteral } from "leaflet";
import { MapLayerColors } from '../../@types';

export const ControledLayer = ({
  name,
  location,
  color,
  fillColor,
  radius,
  checked
}: {
  name: string;
  location: LatLngLiteral,
  color: MapLayerColors,
  fillColor: MapLayerColors,
  radius: number,
  checked?: boolean
}): JSX.Element => <LayersControl.Overlay name={name} checked={checked}>
  <FeatureGroup pathOptions={{ color, fillColor }}>
    <Circle
      center={location}
      radius={radius}
    />
  </FeatureGroup>
</LayersControl.Overlay>;