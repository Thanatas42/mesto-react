import logo from '../../logo.svg';

function Header() {
    return (
            <header className="header">
                <a href="./index.html" target="_self"><img className="header__logo" src={logo}
                    alt="Проект Место" /></a>
            </header>
    );
}

export default Header;