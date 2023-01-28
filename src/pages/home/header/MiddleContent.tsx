import { Carousel, Typography } from "antd";
import styled from "styled-components";
import { Content, Main, ThirdSection, Weather } from "../../../@types";
import { theme } from "../../../Theme";
import { capitalizeFirst, toCelsius } from "../../../utils";
import { LogoDict } from "../../../utils/Logos";

const ContentItemWrapper = styled.div`
  background-color: rgb(90, 134, 222, .8);
  display: flex;
  min-width: calc(360px - (16px*2));
  opacity: 1;
  border-radius: 10px;
  height: 170px;
  padding: 0 0 40px 0;
`;

export const MiddleContent = ({
  content
}: {
  content: Content | null
}): JSX.Element => <Carousel autoplay>
      {content?.firstSection &&  <FirstSection item={content.firstSection}/>}
      {content?.secondSection &&  <SecondSection item={content.secondSection}/>}
      {content?.thirdSection &&  <LastSection item={content.thirdSection}/>}
</Carousel>;

const LastSection = <T extends ThirdSection | undefined>({item}: {item:T}): JSX.Element => {
  return(<ContentItemWrapper>
    {item && (<div style={{
      width: '100%',
      height: '100%',
      display: 'flex'
    }}>
      <div style={{
        flex: 1,
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 0'
      }}>
        <Typography style={{
          ...theme.texts.brandH4,
          color: theme.colors.lightWhite
        }}>
          WIND
        </Typography>
        <Typography style={{
          ...theme.texts.brandSubFont,
          color: theme.colors.lighterWhite
        }}>
          Wind speed: {item.speed}
        </Typography>
        <Typography style={{
          ...theme.texts.brandSubFont,
          color: theme.colors.lighterWhite
        }}>
          Wind deg: {item.deg}
        </Typography>
        <Typography style={{
          ...theme.texts.brandSubFont,
          color: theme.colors.lighterWhite
        }}>
          Wind gust: {item.gust}
        </Typography>
        <Typography style={{
          ...theme.texts.brandH4,
          color: theme.colors.lightWhite
        }}>
          RAIN
        </Typography>
        <Typography style={{
          ...theme.texts.brandSubFont,
          color: theme.colors.lighterWhite
        }}>
          1H: {item["1h"]}
        </Typography>
      </div>
    </div>)}
  </ContentItemWrapper>);
};

const SecondSection = ({ item }: { item: Main | undefined, }): JSX.Element => <ContentItemWrapper>
  {item && (<div style={{
    width: '100%',
    height: '100%',
    display: 'flex'
  }}>
    <div style={{
      flex: 1,
      flexDirection: 'column',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 0'
    }}>
      <Typography style={{
        ...theme.texts.brandFont,
        color: theme.colors.lighterWhite
      }}>
        Temperature: {toCelsius(item.temp)} c°
      </Typography>
      <Typography style={{
        ...theme.texts.brandFont,
        color: theme.colors.lighterWhite
      }}>
        Feels like: {toCelsius(item.feels_like)} c°
      </Typography>
      <Typography style={{
        ...theme.texts.brandFont,
        color: theme.colors.lighterWhite
      }}>
        Min: {toCelsius(item.temp_min)} c°
      </Typography>
      <Typography style={{
        ...theme.texts.brandFont,
        color: theme.colors.lighterWhite
      }}>
        Max: {toCelsius(item.temp_max)} c°
      </Typography>
    </div>
  </div>)}
</ContentItemWrapper>;

const FirstSection = ({ item }: { item: Weather | undefined, }): JSX.Element => <ContentItemWrapper>
  {item && (<div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 16
  }}>
    <div style={{
      flex: 1,
      display: 'flex',
      width: 80,
    }}>
      {LogoDict[item?.icon as keyof typeof LogoDict || 'unknown']}
    </div>
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: 16
    }}>
      <Typography style={{
        ...theme.texts.brandH3,
        color: theme.colors.lighterWhite
      }}>{item.main}</Typography>
      <Typography style={{
        ...theme.texts.brandFont,
        color: theme.colors.lighterWhite
      }}>{capitalizeFirst(item.description)}</Typography>
    </div>
  </div>)}
</ContentItemWrapper>;