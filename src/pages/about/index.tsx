import { Typography } from "antd";
import styled from "styled-components";
import { theme } from "../../Theme";

const AboutContainer = styled.div`
  display: flex;
  width: 100%;
  height; 100%;
  background-color: rgb(111, 120, 123, .4);
  align-items: center;
  padding: 10px;
  flex-direction: column;
  cursor: default;
`;

const About = (): JSX.Element => {
  return (<AboutContainer>
    <Typography style={{
      ...theme.texts.brandH1,
      color: theme.colors.lighterWhite
    }}
    >
      Weather App
    </Typography>
    <Typography style={{
      ...theme.texts.brandFont,
      color: theme.colors.lightWhite,
      padding: 10
    }}>
      Typescript and React based web application that displays the weather at the current location. <br/>
      Also, you can pick another location in the bottom box that contains the cities near to your current location.<br />
    </Typography>
    <Typography style={{
      ...theme.texts.brandSubFont,
      color: theme.colors.lightWhite,
      padding: 10
    }}>
      <strong>Built with:</strong><br/>
      <LinkComponent
        href='https://styled-components.com/'
        text='Styled Components'
      />,
      <LinkComponent
        href='https://openweathermap.org/'
        text=' OpenWeatherAPI'
      />,
      <LinkComponent
        href='https://leafletjs.com/'
        text=' Leaflet '
      /> and
      <LinkComponent
        href='https://react-leaflet.js.org/'
        text=' ReactLeaflet'
      />. <br/>
      Design based on
      <LinkComponent
        href='https://www.behance.net/gallery/120299981/Weather-App-UI-Project?tracking_source=search_projects%7Cweather+app'
        text=' Weather UI Project'
      /> from
      <LinkComponent
        href='https://www.behance.net/Bruna_Atanes'
        text=' Bruna Atanes'
      />.
      <br/>
      <br/>
      <strong>Built by:</strong><br/>
      <strong>David Martinez</strong>.<br/>
      <strong>Networks:</strong><br/>
      <LinkComponent
        href='https://www.linkedin.com/in/davidmrtz-dev/'
        text='LinkedIn'
      />,
      <LinkComponent
        href='https://github.com/davidmrtz-dev'
        text=' GitHub'
      />,
      <LinkComponent
        href='https://david-martinez-dev.netlify.app/'
        text=' Portfolio'
      />.
    </Typography>
</AboutContainer>);
};

const LinkComponent = ({
  href,
  text
}: {
  href: string;
  text: string;
}): JSX.Element => <a
    target='_blank'
    rel="noreferrer"
    style={{ color: 'inherit' }}
    href={href}
  >
  {text}
</a>;

export default About;