import { useEffect } from "react";
import { Version } from "../App"; 
import '../css/Feedback.css';
import PageLayout from "../modules/PageLayouts";

export function FeedbackBar() {
    return (
        <>
            <div
                className="feedback-bar"
                id="feedbackBar"
            >
                <p>You are currently testing version {Version} of Chok Glosses. Please leave feedback of your experience <a href="/feedback" className="green-highlight">here</a></p>   
            </div>
        </>
    );
}

function Feedback() {
    useEffect(()=> {
        const feedbackBar = document.getElementById('feedbackBar');
        if (feedbackBar) {
            feedbackBar.style.display = 'none';
        }
    }, []);

    return (
        <>
            <PageLayout.Main
                children={
                    <>
                        <h2>Before submitting, check if your idea is already an upcoming upgrade:</h2>
                        <ul>
                            <li>- Footer changes</li>
                            <li>- Shop features</li>
                            <li>- Course sharing features</li>
                            <li>- .lbsv file compiling</li>
                        </ul>
                        <h3>Not listed here? Great, go ahead and submit it below:</h3>
                    </>
                }
            />
            <PageLayout.Main
                children={
                    <h2><a href="https://forms.gle/toYohfpHZP3ZzXLk6" target="_blank" className="green-highlight">Submit here</a></h2>
                }
                mainHidden
            />
            {/*
                <div className='tile-collection'>
                    <div className="tile full-width">
                        <h2>Leave some feedback</h2>
                        <form className="feedback-form">
                            <input className="feedback-input email" type="email" placeholder="Email" required></input>
                            <textarea className="feedback-input body" placeholder="Feedback" required></textarea>
                        </form>
                    </div>
                </div>
            */}
        </>
    );
}

export default Feedback;