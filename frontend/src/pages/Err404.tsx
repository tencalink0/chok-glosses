import PageLayout from "../modules/PageLayouts";

function Err404() {
    return (
        <PageLayout.Main
            children={
                <>
                    <h1 style={{textAlign: 'center', margin: '1%'}}>Error: Page not found</h1>
                    <h2 style={{color: 'var(--red)', margin: '1%'}}>:(</h2>
                    <p style={{textAlign: 'center', margin: '1%'}}>Try checking the url or flag this issue if it persists</p>
                </>
            }
        />
    );
}

export default Err404;