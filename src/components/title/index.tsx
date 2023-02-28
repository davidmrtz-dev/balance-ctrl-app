import { Button, Popover, Typography } from "antd";
import styled from "styled-components"
import { theme } from "../../Theme";

const TitleWrapper = styled.div`
  background-color: ${p => p.theme.colors.grays.light};
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const TypeOptions = (
  <div style={{
    display: 'flex',
    flexDirection: 'column'
  }}>
    <Button style={{
      ...theme.texts.brandSubFont,
      marginBottom: 5
    }}>
      Current
    </Button>
    <Button style={{
      ...theme.texts.brandSubFont
    }}>
      Fixed
    </Button>
  </div>
);

const Title = (text: string): JSX.Element => <TitleWrapper>
  <Typography.Text style={{
    ...theme.texts.brandH5,
    paddingLeft: 5
  }}>
    {text}
  </Typography.Text>
  <Popover
    content={TypeOptions}
    title={`${text.slice(0, -1)} type`}
    trigger="click"
    overlayStyle={{ width: 150 }}
  >
    <Button style={{ width: 46 }}>+</Button>
  </Popover>
</TitleWrapper>;

export default Title;
