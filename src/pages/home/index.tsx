import { LatLngLiteral } from 'leaflet';
import { useEffect, useState } from 'react';
import { City, Content, WeatherResponse } from '../../@types';
import { getCitiesByLocation } from '../../api/core/GeoDB';
import { getWeatherByLocation } from '../../api/core/OpenWeather';
import { LoadingMask } from '../../atoms/LoadingMask';
import Map from '../../components/map';
import Bottom from './bottom';
import Header from './header';
import { LocationRequester } from './location/LocationRequester';


const parseWeatherToContent = (data: WeatherResponse): Content => ({
  firstSection: data.weather ? data.weather[0] : undefined,
  secondSection: data.main,
  thirdSection: data.wind && data.rain && data.clouds ? {...data.wind, ...data.rain, ...data.clouds} : undefined
});

const Home = (): JSX.Element => {
  const [position, setPosition] = useState<null | LatLngLiteral>(null);
  const [nearCities, setNearCities] = useState<City []>([]);
  const [content, setContent] = useState<Content | null>(null);
  const [region, setRegion] = useState('');
  const [updateTop, setUpdateTop] = useState(false);

  const getCities = async(location: LatLngLiteral): Promise<void> => {
    try {
      const result = await getCitiesByLocation(location, '100');
      setNearCities(result.data);
    } catch(e) {
      console.log('There was an unexpected error');
    }
  };

  const getWeather = async(location: LatLngLiteral): Promise<void> => {
    try {
      const result = await getWeatherByLocation(location);
      setContent(parseWeatherToContent(result));
    } catch (e) {
      console.log('There was an unexpected error');
    }
  };

  useEffect(() => {
    if (position && !content) getWeather(position);
    if (position && content && nearCities.length === 0) getCities(position);
    if (nearCities.length > 0 && !region) setRegion(nearCities[0].region);
  }, [position, content, nearCities, region]);

  useEffect(() => {
    if (position) {
      setUpdateTop(true);
    }
  }, [position]);

  useEffect(() => {
    if (updateTop) {
      setTimeout(() => {
        setUpdateTop(false);
      }, 1000);
    }
  }, [updateTop])

  return (
    <>
      {(content && position) ? (<>
        <div style={{
          padding: '0 16px'
        }}>
          <Header
            content={content}
            region={region}
            updating={updateTop}
          />
        </div>
        <div style={{
          padding: '16px 16px',
          backgroundColor: 'rgba(250, 250, 251, .8)',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px'
        }}>
          <Map position={position} />
          <Bottom
            nearCities={nearCities}
            setPosition={setPosition}
          />
        </div>
      </>) : (<LoadingMask fixed />)}
      <LocationRequester  {...{ open: !position, setPosition: setPosition }}/>
    </>
  );
};

export default Home;