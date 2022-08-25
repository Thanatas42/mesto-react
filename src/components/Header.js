import React from 'react';
import logo from '../images/logo/header__logo.svg';

function Header() {
    return (
        <header className="header">
            <a href="#top" target="_self"><img className="header__logo" src={logo}
                alt="Проект Место" /></a>
        </header>
    );
};

export default Header;