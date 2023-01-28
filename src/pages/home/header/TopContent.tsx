import { Typography } from "antd";
import styled from "styled-components";
import { theme } from "../../../Theme";
import { Content } from '../../../@types';
import { toCelsius } from '../../../utils';
import { LogoDict } from "../../../utils/Logos";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: default;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

export const TopContent = ({
  content,
  region
}: {
  content: Content | null;
  region: string;
}): JSX.Element => content ? (<ContentContainer>
  <ContentWrapper style={{ paddingTop: '10px' }}>
    <Typography
      style={{
        ...theme.texts.brandFont,
        color: theme.colors.lighterWhite
      }}
    >Now in {region || ''}</Typography>
  </ContentWrapper>
  <ContentWrapper
    style={{
      display: 'flex',
      alignItems: 'center'
    }}
  >
    <div id='working' style={{
      display: 'flex',
      flex: 2
    }}>
      <Typography style={{
        ...theme.texts.brandH1,
        color: theme.colors.lighterWhite,
        fontSize: '5em'
      }}>
        {toCelsius(content.secondSection?.temp, 1)}
      </Typography>
      <Typography style={{
        ...theme.texts.brandFont,
        color: theme.colors.lighterWhite,
        fontWeight: 'bold',
        paddingTop: '10px'
      }}>c°</Typography>
    </div>
    <div style={{
      flex: 1
    }}>
      {LogoDict[content.firstSection?.icon as keyof typeof LogoDict || 'unknown']}
    </div>
  </ContentWrapper>
</ContentContainer>) : (<></>);