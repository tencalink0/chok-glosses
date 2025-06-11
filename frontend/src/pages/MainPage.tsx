import '../css/MainPage.css'

function MainPage() {
    return(
        <>  
            <div className='mainpage'>
                <div className='tile-collection'>
                    <div className="tile big">
                        hi
                    </div>
                    <div className="tile">
                        <table className='leaderboards'>
                            <tr>
                                <th>Leaderboards</th>
                            </tr>
                            <tr>
                                <td>Player 1</td>
                            </tr>
                            <tr>
                                <td>Player 2</td>
                            </tr>
                            <tr>
                                <td>Player 3</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPage;