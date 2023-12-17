import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, onLogout }) => {
    return (
        <header>
            <nav>
                <h1>Stocks</h1>
                <ul>

                    {isLoggedIn ? (
                        <>
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/settings">Settings</Link>
                            </li>
                            <li>
                                <button onClick={onLogout}>Logout</button>
                            </li>

                        </>
                    ) : (
                        <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                          <li>
                          <Link to="/register">Register</Link>
                      </li>
                      </>
                    )}
                  
                </ul>
            </nav>
        </header>
    );
};

export default Header;
