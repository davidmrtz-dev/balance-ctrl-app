import { Typography } from "antd";
import { CSSProperties } from "styled-components";
import { theme } from "../../Theme";

export const SubFontText = (text: string, style?: CSSProperties): JSX.Element => <Typography.Text style={{ ...theme.texts.brandSubFont, ...style }}>
  {text}
</Typography.Text>;
