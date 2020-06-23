import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.css';

export const Sidebar = () => {
  const [authTokens, setAuthTokens] = React.useState(
    localStorage.getItem('key-jwt')
  );

  const handleLogout = () => {
    localStorage.removeItem('key-jwt');
    localStorage.removeItem('selectedSite');
    setAuthTokens(localStorage.getItem('key-jwt'));
  };
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/survey">
        Ankieta
      </a>

      <a className="menu-item" href="/visit/list">
        Wizyty
      </a>

      <a className="menu-item" href="/login" onClick={handleLogout}>
        {authTokens ? 'Wyloguj' : 'Zaloguj'}
      </a>
    </Menu>
  );
};
