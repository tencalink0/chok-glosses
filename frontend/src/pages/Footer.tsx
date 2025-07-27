import { useNavigate } from 'react-router-dom';
import Logo from '../assets/img/logo-bw.png';

import '../css/Footer.css';

function Footer() {
    const navigate = useNavigate();

    const updatePage = (href: string) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(href);
    }

    return (
        <>
            <div className='footer-container'>
                <footer>
                    <div className='footer-logo-container'>
                        <img className="footer-logo" src={Logo}></img>
                        <div className='icontray'>
                        
                        </div>
                    </div>
                    <div>
                        <h2>Quick links</h2>
                        <ul className='footer-column'>
                            <li><a className='green-highlight' onClick={() => updatePage('/')}>Home</a></li>
                            <li><a className='green-highlight' onClick={() => updatePage('/practice')}>Practice</a></li>
                            <li><a className='green-highlight' onClick={() => updatePage('/courses')}>Courses</a></li>
                            <li><a className='green-highlight' onClick={() => updatePage('/upload')}>Upload</a></li>
                            <li><s>Login</s></li>
                        </ul>
                    </div>
                    <div>
                        <h2>Icons</h2>
                        <ul className='footer-column'>
                            <li>
                                <a className='green-highlight' target="_blank" href="https://icons8.com/icon/72730/flashcards">Flashcards </a>
                                <span className='large-only'>icon by <a className='green-highlight' target="_blank" href="https://icons8.com">Icons8</a></span>
                            </li>
                            <li>
                                <a className='green-highlight' target="_blank" href="https://icons8.com/icon/11475/speaker">Speaker </a>
                                <span className='large-only'>icon by <a className='green-highlight' target="_blank" href="https://icons8.com">Icons8</a></span>
                            </li>
                            <li>
                                <a className='green-highlight' target="_blank" href="https://icons8.com/icon/36871/hand-with-pen">Writing </a>
                                <span className='large-only'>icon by <a className='green-highlight' target="_blank" href="https://icons8.com">Icons8</a></span>
                            </li>
                            <li>
                                <a className='green-highlight' target="_blank" href="https://icons8.com/icon/42763/book">Book </a>
                                <span className='large-only'>icon by <a className='green-highlight' target="_blank" href="https://icons8.com">Icons8</a></span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2>Credits</h2>
                        <ul className='footer-column'>
                            <li><a className='green-highlight' target="_blank" href="https://github.com/bev29rr">bev29rr</a></li>
                            <li><a className='green-highlight' target="_blank" href="https://github.com/tencalink0">tencalink0</a></li>
                            <li><a  className='green-highlight' target="_blank" href="/testers">All testers</a></li>
                        </ul>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default Footer;