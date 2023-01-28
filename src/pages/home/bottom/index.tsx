import { Carousel, Typography } from "antd";
import { LatLngLiteral } from "leaflet";
import styled from "styled-components";
import { City, validCityKeys } from "../../../@types";
import { theme } from "../../../Theme";
import { capitalizeFirst } from "../../../utils";

const ContentItemWrapper = styled.div`
  background-color: rgba(90, 134, 222, .9);
  display: flex;
  min-width: calc(360px - (16px*2));
  height: 150px;
  opacity: 1;
  border-radius: 10px;
  padding: 20px 16px 40px;
  cursor: pointer;
`;

const Bottom = ({
  nearCities,
  setPosition
}: {
  nearCities: City [];
  setPosition: (newPos: LatLngLiteral) => void;
}): JSX.Element => <Carousel autoplay>
  {nearCities.length > 0 && nearCities.map((city: City) => <ContentItemWrapper
    key={city.id}
    onClick={() => setPosition({ lat: city.latitude, lng: city.longitude })}
  >
    {Object.keys(city).filter(k => validCityKeys.includes(k)).map((key) => <Typography
      key={key}
      style={{
        ...theme.texts.brandSubFont,
        color: theme.colors.lighterWhite
      }}
    >
      <strong>{capitalizeFirst(key)}:</strong> {city[key as keyof typeof city].toString()}{key === 'distance' && ' km'}
    </Typography>)}
  </ContentItemWrapper>)}
</Carousel>;

export default Bottom;