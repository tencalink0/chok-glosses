function Err404() {
    return (
        <>
            <div className='mainpage'>
                <div className='tile-collection'>
                    <div className="tile full-width">
                        <h1 style={{textAlign: 'center', margin: '1%'}}>Error: Page not found</h1>
                        <h2 style={{color: 'var(--red)', margin: '1%'}}>:(</h2>
                        <p style={{textAlign: 'center', margin: '1%'}}>Try checking the url or flag this issue up if it persists</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Err404