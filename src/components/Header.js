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
                                <Link to="/dashboard">Home</Link>
                            </li>
                            <li>
                                <Link to="/saved">Saved</Link>
                            </li>
                            <li>
                                <button onClick={onLogout}>SignOut</button>
                            </li>

                        </>
                    ) : (
                        <>
                        <li>
                            <Link to="/login">Sign In</Link>
                        </li>
                          <li>
                          <Link to="/register">Sign Up</Link>
                      </li>
                      </>
                    )}
                  
                </ul>
            </nav>
        </header>
    );
};

export default Header;
