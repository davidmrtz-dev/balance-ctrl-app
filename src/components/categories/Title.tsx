import { Button, Typography } from "antd";
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

export const Title = (text: string, setShow: () => void): JSX.Element => {
  return(<TitleWrapper>
    <Typography.Text style={{
      ...theme.texts.brandH5,
      paddingLeft: 5
    }}>
      {text}
    </Typography.Text>
    <Button
      style={{
        ...theme.texts.brandSubFont,
        width: 46
      }}
      onClick={setShow}
      >
        +
      </Button>
  </TitleWrapper>);
};
