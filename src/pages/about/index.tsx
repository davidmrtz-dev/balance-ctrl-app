import { Typography } from "antd";
import styled from "styled-components";
import { theme } from "../../Theme";
import { FontText, SubFontText } from "../../atoms/text";

const AboutContainer = styled.div`
  display: flex;
  width: 100%;
  height; 100%;
  align-items: flex-start;
  padding: 10px;
  flex-direction: column;
  cursor: default;
`;

const About = (): JSX.Element => {
  return (<AboutContainer>
    <Typography style={{
      ...theme.texts.brandH1
    }}
    >
      Balance Ctrl
    </Typography>
    {FontText('Take complete control over your finances')}
    <br/>
    <Typography style={{
      ...theme.texts.brandSubFont,
    }}>
      <strong>David Martinez</strong><br/>
      <LinkComponent
        href='https://www.linkedin.com/in/davidmrtz-dev/'
        text='LinkedIn'
      /><br/>
      <LinkComponent
        href='https://github.com/davidmrtz-dev'
        text=' GitHub'
      /><br/>
      <LinkComponent
        href='https://david-martinez-dev.netlify.app/'
        text=' Portfolio'
      />
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
