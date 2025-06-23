import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getReading } from "../modules/LocalStorage";
import type { Sentence } from "../modules/Types";

import '../css/Reading.css';

function Reading() {
    const [ error, setError ] = useState<string | null>(null);
    const [ title, setTitle ] = useState<string | undefined>(undefined);

    const [ _levelGroupIdNum, setLevelGroupIdNum ] = useState<number>(1);
    const [ _levelIdNum, setLevelIdNum ] = useState<number>(1);
    const [ _sentenceIdNum, setSentenceIdNum ] = useState<number>(1);

    const [ sentences, setSentences ] = useState<Sentence[] | undefined>(undefined);

    const { levelGroupId, levelId } = useParams();
    const [ searchParams ] = useSearchParams();
    const sentenceId = searchParams.get("sentenceId");

    useEffect(() => {
        if (levelGroupId && levelId && sentenceId) {
            let [levelGroupIdTemp, levelIdTemp, sentenceIdTemp] = [0, 0, 0];
            try {
                [levelGroupIdTemp, levelIdTemp, sentenceIdTemp] = [parseInt(levelGroupId), parseInt(levelId), parseInt(sentenceId)];
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
                if (errCurrentDeck.sentences.length < sentenceIdTemp) {
                    setError('Sentence Id Out of Range');
                } else {
                    setTitle(errCurrentDeck.title);
                    setSentences(errCurrentDeck.sentences);
                    setSentenceIdNum(sentenceIdTemp);
                }
            }
        } else {
            setError('Broken url sub-path');
        }
    }, []);
    
    return(
        <div className='mainpage'>
            <div className='tile-collection'>
                <div className="tile full-width">
                    {
                        error === null && sentences && sentenceId ? (
                            <>
                                <h2>{title}</h2>
                                <ul>
                                    {
                                        sentences.map((sentence, index) => (
                                            <li key={index} style={{
                                                padding: '15px'
                                            }}>
                                                {
                                                    sentence.clauses.map((clause, clauseIndex) => (
                                                        <span className="clause-wrapper" key={clauseIndex} >
                                                            {clause.original}&nbsp;
                                                            {clause.help && (
                                                                <span className="help-tip">{clause.help}</span>
                                                            )}
                                                        </span>
                                                    ))
                                                }
                                            </li>
                                        ))
                                    }
                                </ul>
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