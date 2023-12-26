// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { MdWbSunny } from 'react-icons/md';
import { MdOutlineWbSunny } from 'react-icons/md';

import { useTheme } from './ThemeContext';
import NotificationsDialog from './Dashboard/NotificationsDialog';


const Header = ({ isLoggedIn, onLogout }) => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header>
      <nav>
        <h3>Stocks</h3>
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/saved">Saved</Link>
              </li>
              <li>
                <span>
                  <IoIosNotificationsOutline onClick={handleNotificationClick} />
                  {showNotifications && <NotificationsDialog  />}
                </span>
              </li>
              <li>
                <button onClick={toggleTheme}>
                  {isDarkTheme ? <MdOutlineWbSunny /> : <MdWbSunny />}
                </button>
              </li>
              <li>
                <button onClick={onLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <button onClick={toggleTheme}>
                  {isDarkTheme ? <MdOutlineWbSunny /> : <MdWbSunny />}
                </button>
              </li>
              <li>
                <Link to="/register">SignUp</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
