import '../css/Header.css';

function Header() {
    return (
        <>
            <header>
                <div className="logo"></div>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#">Progress</a></li>
                    <li><a href="#">Courses</a></li>
                </ul>
                <div className="login-container">
                    <button className="login">login</button>
                </div>
            </header>
        </>
    );
}

export default Header;