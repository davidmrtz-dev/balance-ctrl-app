import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import { NavigationContainer } from '../containers/NavigationContainer';
import { useState } from 'react';
import { Button, Drawer, Space, Typography } from 'antd';
import { theme } from '../../Theme';
import { useStyletron } from "styletron-react";
import { useAuthContext } from '../../context/AuthContext';

const Navigation = (): JSX.Element => {
  const auth = useAuthContext();
  const history = useHistory();
  const [css] = useStyletron();
  const [show, setShow] = useState(false);
  const [date] = useState(new Date());

  const menuBtnStyles = css({
    ...theme.texts.brandSubFont,
    fontWeight: 'bold',
    backgroundColor: theme.colors.whites.lighter,
    borderColor: theme.colors.whites.lighter,
    textAlign: 'initial',
    color: theme.colors.blacks.normal,
    ':hover': {
      color: `${theme.colors.grays.darker} !important`,
      borderColor: `${theme.colors.grays.darker} !important`,
    }
  });

  const dateStyles = css({
    ...theme.texts.brandFont,
    color: theme.colors.blacks.normal
  });

  const handleLogout = async() => {
    try {
      await auth.unauthenticate();
      history.push('/login');
    } catch(error) {
      console.log(error);
    }
    setShow(false);
  }

  return(
    <NavigationContainer>
      <Typography className={dateStyles}>Today, {date.toLocaleDateString()}</Typography>
      {!show && (<FontAwesomeIcon
        color={theme.colors.blacks.normal}
        size='lg'
        style={{ cursor: 'pointer' }}
        icon={faBars} onClick={() => setShow(true)}/>)
      }
      {show && (<FontAwesomeIcon
        color={theme.colors.blacks.normal}
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
          height: 'auto',
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
          backgroundColor: `${theme.colors.whites.lighter}`,
          padding: 16
        }}
        contentWrapperStyle={{
          boxShadow: 'none'
        }}
      >
        {auth.isAuthenticated ?
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
            <Link to='/login'>
              <Button
                block
                onClick={handleLogout}
                className={menuBtnStyles}
              >
                Logout
              </Button>
            </Link>
            <FooterNav />
          </Space> :
          <Space direction="vertical">
            <Link to='/login'>
              <Button
                block
                onClick={() => setShow(false)}
                className={menuBtnStyles}
              >
                Login
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
            <FooterNav />
          </Space>
        }
      </Drawer>
    </NavigationContainer>
  );
};

const FooterNav = () => <div style={{
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'default',
    paddingTop: 10
  }}>
    <FontAwesomeIcon
      color={theme.colors.blacks.normal}
      fill={theme.colors.blacks.normal}
      size='1x'
      icon={faBalanceScale}
    />
    <Typography style={{
      ...theme.texts.brandFont,
      paddingLeft: 10,
      color: theme.colors.blacks.normal
    }}
    >
      Balance Ctrl
    </Typography>
</div>;

export default Navigation;