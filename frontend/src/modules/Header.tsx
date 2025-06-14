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
                    <li><a href="/">Home</a></li>
                    <li><a href="#">Progress</a></li>
                    <li><a href="#">Practice</a></li>
                    <li><a href="/courses">Courses</a></li>
                </ul>
                <div className="login-container">
                    <button className="button-green">login</button>
                </div>
            </header>
        </>
    );
}

export default Header;