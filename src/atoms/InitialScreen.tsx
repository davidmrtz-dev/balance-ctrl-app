import { faBalanceScale } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer } from "antd";
import { LoadingMask } from "./LoadingMask";
import { theme } from "../Theme";

const InitialScreen = (props: any): JSX.Element =>
  <Drawer
    placement={'left'}
    open={props.open}
    key={'top'}
    closable={false}
    style={{
      width: 360,
      height: '100%',
      position: 'absolute',
      left: 0,
      right: 0,
      marginLeft: 'auto',
      marginRight: 'auto'
    }}
    bodyStyle={{
      background:`
        linear-gradient(
          25deg,
          ${theme.colors.whites.lighter} 35%,
          ${theme.colors.whites.normal} 100%)
      `,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    contentWrapperStyle={{
      width: '100%',
      boxShadow: 'none',
      backgroundColor: theme.colors.grays.light,
    }}
  >
  <FontAwesomeIcon
    color={theme.colors.blacks.normal}
    size='3x'
    icon={faBalanceScale}
    style={{ zIndex: 1000 }}
  />
  <LoadingMask fixed />
</Drawer>;

export default InitialScreen;
