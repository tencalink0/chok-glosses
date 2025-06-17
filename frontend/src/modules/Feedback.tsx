import { Version } from "../App"; 

export function FeedbackBar() {
    return (
        <>
            <div
                style={{
                    background: 'var(--level-green)',
                    padding: '1%',
                    color: 'var(--grey-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} 
            >
                <p>You are currently testing version {Version} of Chok Glosses. Please leave feedback of your experience <a className="green-highlight">here</a></p>   
            </div>
        </>
    );
}

function Feedback() {
    return (
        <>
        </>
    );
}

export default Feedback;