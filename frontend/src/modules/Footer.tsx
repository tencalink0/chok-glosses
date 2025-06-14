import '../css/Footer.css';

function Footer() {
    return (
        <>
            <div className='footer-container'>
                <footer>
                    <div className='icon-credits'>
                        <h2>Credits</h2>
                        <ul>
                            <li>
                                <a className='green-highlight' target="_blank" href="https://icons8.com/icon/72730/flashcards">Flashcards</a> icon by <a className='green-highlight' target="_blank" href="https://icons8.com">Icons8</a>
                            </li>
                            <li>
                                <a className='green-highlight' target="_blank" href="https://icons8.com/icon/11475/speaker">Speaker</a> icon by <a className='green-highlight' target="_blank" href="https://icons8.com">Icons8</a>
                            </li>
                            <li>
                                <a className='green-highlight' target="_blank" href="https://icons8.com/icon/36871/hand-with-pen">Writing</a> icon by <a className='green-highlight' target="_blank" href="https://icons8.com">Icons8</a>
                            </li>
                            <li>
                                <a className='green-highlight' target="_blank" href="https://icons8.com/icon/42763/book">Book</a> icon by <a className='green-highlight' target="_blank" href="https://icons8.com">Icons8</a>
                            </li>
                        </ul>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default Footer;