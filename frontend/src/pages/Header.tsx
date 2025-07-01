import '../css/Header.css';
import logo from '../assets/logo.png';

function Header() {
    return (
        <>
            <header>
                <div className="logo">
                    <a href='/'><img src={logo}></img></a>
                </div>
                <ul>
                    <a href="/practice"><li>Practice</li></a>
                    <a href="/courses"><li>Courses</li></a>
                    <a href="/shop"><li>Shop</li></a>
                </ul>
                <div className="login-container">
                    <button className="button-green" disabled>login</button>
                </div>
            </header>
        </>
    );
}

export default Header;