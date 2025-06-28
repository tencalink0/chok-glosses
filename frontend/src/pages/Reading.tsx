import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReading, setLevelCompletion, setSentenceCompletion } from "../modules/LocalStorage";
import type { Sentence } from "../modules/Types";
import confetti from "canvas-confetti";

import '../css/Reading.css';

function Reading() {
    const [ error, setError ] = useState<string | null>(null);
    const [ title, setTitle ] = useState<string | undefined>(undefined);

    const [ levelGroupIdNum, setLevelGroupIdNum ] = useState<number>(1);
    const [ levelIdNum, setLevelIdNum ] = useState<number>(1);

    const [ sentences, setSentences ] = useState<Sentence[] | undefined>(undefined);
    const [ isAnswer, setIsAnswer ] = useState(false);
    const [ allSentencesDone, setAllSentencesDone ] = useState(false);

    const { levelGroupId, levelId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (levelGroupId && levelId) {
            let [levelGroupIdTemp, levelIdTemp] = [0, 0];
            try {
                [levelGroupIdTemp, levelIdTemp] = [parseInt(levelGroupId), parseInt(levelId)];
                setLevelGroupIdNum(levelGroupIdTemp);
                setLevelIdNum(levelIdTemp);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(String(error));
                }
                return;
            }

            let errCurrentDeck = getReading(levelGroupIdTemp, levelIdTemp);
            if (typeof errCurrentDeck === 'string') {
                setError(errCurrentDeck);
            } else {
                setTitle(errCurrentDeck.title);
                setSentences(errCurrentDeck.sentences);
                checkSentencesComplete(errCurrentDeck.sentences);
            }
        } else {
            setError('Broken url sub-path');
        }
    }, []);

    useEffect(() => {
        if (allSentencesDone) {
            confetti({
                particleCount: 250,
                spread: 70,
                startVelocity: 60,
                gravity: 1.5,
                ticks: 120,
                origin: { x: 0.5, y: 1 }
            });
        }
    }, [allSentencesDone]);

    const toggle = () => setIsAnswer(!isAnswer);

    const completeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        const sentenceId = parseInt(e.target.value);

        if (!sentences) return;

        if (sentenceId < 1 || sentenceId > sentences.length) return;

        const updatedSentences = [...sentences];
        updatedSentences[sentenceId-1] = {
            ...updatedSentences[sentenceId-1],
            completed: isChecked
        };

        setSentenceCompletion(
            levelGroupIdNum,
            levelIdNum,
            sentenceId,
            isChecked
        );

        setSentences(updatedSentences);
        checkSentencesComplete(updatedSentences);
    };

    const updateSectionStatus = (allCompleted: boolean) => {
        setLevelCompletion(
            levelGroupIdNum,
            levelIdNum,
            allCompleted
        );
    }

    const checkSentencesComplete = (updatedSentences?: Sentence[]) => {
        let localSentences = updatedSentences ?? sentences;
        let allCompleted = true;
        localSentences?.forEach((sentence) => {
            if (!sentence.completed) allCompleted = false;
        });
        setAllSentencesDone(allCompleted)
        updateSectionStatus(allCompleted);
    }
    
    return(
        <div className='mainpage'>
            <div className='tile-collection'>
                <div className="tile full-width">
                    {
                        error === null && sentences ? (
                            <>
                                <div style={{
                                    position: 'relative'
                                }}>
                                    <div className={`toggle-switch ${isAnswer ? 'on' : 'off'}`} onClick={toggle}>
                                        <div className="toggle-thumb">{isAnswer ? 'A' : '?'}</div>
                                    </div>
                                </div>
                                <h2>{title}</h2>
                                <ul>
                                    {
                                        sentences.map((sentence, index) => (
                                            <li key={index} style={{
                                                padding: '15px',
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                                {
                                                    sentence.clauses.map((clause, clauseIndex) => (
                                                        <span className="clause-wrapper" key={clauseIndex} >
                                                            {clause.original}&nbsp;
                                                            {!isAnswer ? clause.help && (
                                                                <span className="help-tip">{clause.help}</span>
                                                            ) : (
                                                                <span className="help-tip" style={{
                                                                    backgroundColor: 'var(--level-green)'
                                                                }}>{clause.translated}</span>
                                                            )}
                                                        </span>
                                                    ))
                                                }
                                                <input 
                                                    type="checkbox"
                                                    className="sentence-check"
                                                    value={index + 1}
                                                    checked={sentence.completed}
                                                    onChange={completeCheck}
                                                ></input>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '10px',
                                        borderRadius: 'var(--border-radius)',
                                        backgroundColor: 'var(--grey)'
                                    }}>
                                        Completed:&nbsp;
                                        <input 
                                            type="checkbox"
                                            className="sentence-check"
                                            value="completed"
                                            checked={allSentencesDone}
                                            readOnly
                                        ></input>
                                    </div>
                                    {allSentencesDone ? (
                                        <a 
                                            className='green-highlight' style={{
                                                fontSize: '20px'
                                            }}
                                            onClick={() => navigate('/')}
                                        >Return Home</a>
                                    ) : <></>

                                    }
                                </div>
                            </>
                        ) : (
                            <h2>Error: {error}</h2>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Reading;