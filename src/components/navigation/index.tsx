import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUmbrella } from '@fortawesome/free-solid-svg-icons';
import { NavigationContainer } from '../containers/NavigationContainer';
import { useState } from 'react';
import { Button, Drawer, Space, Typography } from 'antd';
import { theme } from '../../Theme';
import { useStyletron } from "styletron-react";

const Navigation = (): JSX.Element => {
  const [css] = useStyletron();
  const [show, setShow] = useState(false);
  const [date] = useState(new Date());

  const menuBtnStyles = css({
    ...theme.texts.brandSubFont,
    fontWeight: 'bold',
    background: theme.colors.blues.fancyBlue,
    borderColor: theme.colors.blues.fancyBlue,
    textAlign: 'initial',
    color: theme.colors.lighterWhite,
    ':hover': {
      color: theme.colors.blues.darkBlue
    }
  });

  const dateStyles = css({
    ...theme.texts.brandFont,
    color: theme.colors.lighterWhite
  });

 return(
  <NavigationContainer>
    <Typography className={dateStyles}>Today, {date.toLocaleDateString()}</Typography>
    {!show && (<FontAwesomeIcon
      color={theme.colors.lighterWhite}
      size='lg'
      style={{ cursor: 'pointer' }}
      icon={faBars} onClick={() => setShow(true)}/>)
    }
    {show && (<FontAwesomeIcon
      color={theme.colors.lighterWhite}
      size='lg'
      style={{ cursor: 'pointer' }}
      icon={faTimes} onClick={() => setShow(false)}/>)
    }
    <Drawer
      placement={'top'}
      onClose={() => setShow(false)}
      open={show}
      key={'top'}
      closable={false}
      style={{
        width: 360,
        height: 150,
        position: 'absolute',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none !important',
        background:`
          linear-gradient(25deg,
          ${theme.colors.blues.transitionBlue} 35%,
          ${theme.colors.blues.fancyBlue} 100%)
        `
      }}
      contentWrapperStyle={{
        boxShadow: 'none'
      }}
    >
      <Space direction="vertical">
        <Link to='/'>
          <Button
            block
            onClick={() => setShow(false)}
            className={menuBtnStyles}
          >
            Home
          </Button>
        </Link>
        <Link to='/about'>
          <Button
            block
            onClick={() => setShow(false)}
            className={menuBtnStyles}
          >
            About
          </Button>
        </Link>
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          cursor: 'default'
        }}>
          <FontAwesomeIcon
            color={theme.colors.lighterWhite}
            fill={theme.colors.lighterWhite}
            size='2x'
            icon={faUmbrella}
          />
          <Typography style={{
            ...theme.texts.brandSubFont,
            color: theme.colors.lighterWhite,
            padding: 5
          }}
          >
            Weather App
          </Typography>
        </div>
      </Space>
    </Drawer>
  </NavigationContainer>
 );
};

export default Navigation;