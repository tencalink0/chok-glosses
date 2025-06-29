import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

import '../css/Flashcard.css';
import { getDeck, setFlashcardStrength, setLevelCompletion } from '../modules/LocalStorage';
import type { Flashcard } from '../modules/Types';

type FlashcardWithId = Flashcard & {id: number};

function calculateStrength(
    prevStrength: number, // big significance
    help: boolean, // medium significance
    time: number, // small significance
    correct: boolean // big significance
) {
    const target = correct ? 1 : 0;
    let rate = 0.3;

    if (help) {
        rate *= 0.5;
    }

    const timeDecay = 1 / Math.pow(Math.E, time * 0.01);
    rate *= timeDecay;

    const newStrength = prevStrength + rate * (target - prevStrength);

    return newStrength;
}

function shuffle<T>(cards: T[]): T[] {
    const array = [...cards];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const BtnList: React.FC<{
    btnState: boolean, 
    helpState: boolean,
    helpFn: () => void,
    responseFn: (state: boolean) => void
}> = ({btnState, helpState, helpFn, responseFn}) => {


    return (
        <div className='button-collection-row'>
            <button 
                className='button-green flashcard-btn' 
                disabled={!btnState}
                onClick={() => {responseFn(true)}}
            >✔️</button>
            <button 
                className='button-green flashcard-btn' 
                disabled={!helpState}
                onClick={helpFn}
            >🤔</button>
            <button 
                className='button-green flashcard-btn' 
                disabled={!btnState}
                onClick={() => {responseFn(false)}}
            >❌</button>
        </div>
    );
}

const Card: React.FC<{
    front: string, 
    back: string, 
    lastCard: boolean,
    done: boolean,
    setBtn: (state: boolean) => void,
    setHelp: (state: boolean) => void
}> = ({front, back, lastCard, done, setBtn, setHelp}) => {
    const [ shownCard, setShownCard ] = useState(front);
    const [ flipped, setFlipped ] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (done) {
            confetti({
                particleCount: 250,
                spread: 70,
                startVelocity: 60,
                gravity: 1.5,
                ticks: 120,
                origin: { x: 0.5, y: 1 }
            });
        }
    }, [done]);

    const handleClick = () => {
        setBtn(true);
        setHelp(false);
        if (!done) setFlipped(!flipped);
        if (shownCard == front) {
            setShownCard(back);
        } else {
            setShownCard(front);
        }
    };

    return (
        <div className="flashcard-container">
            <div 
                className={`flashcard ${flipped ? 'flipped' : ''} ${lastCard ? '' : 'back-card'}`}
                style={done ? { 
                    backgroundColor: 'white', 
                    color: 'var(--blue)' 
                } : {}}
                onClick={handleClick}
            >
                <div className="flashcard-content">
                    <div className={`${!done ? 'flashcard-front' : ''} flashcard-content`}>{
                        done ? (
                            <div>
                                <p>All done!</p>
                                <a 
                                    className='green-highlight' style={{
                                        fontSize: '24px'
                                    }}
                                    onClick={() => navigate('/')}
                                >Return Home</a>
                            </div>
                        ) : shownCard}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Flashcards = () => {
    const [ error, setError ] = useState<string | null>(null);
    const [ buttonStates, setButtonStates ] = useState<boolean>(false);
    const [ helpState, setHelpState ] = useState<boolean>(false);
    const [ helpUse, setHelpUse ] = useState<boolean>(false);
    const [ finished, setFinished ] = useState<boolean>(false);

    const [ title, setTitle ] = useState<string | undefined>(undefined);
    const [ flaschardQueue, setFlashcardQueue ] = useState<FlashcardWithId[]>([]);

    const [ levelGroupIdNum, setLevelGroupIdNum ] = useState<number>(1);
    const [ levelIdNum, setLevelId ] = useState<number>(1);

    const { levelGroupId, levelId } = useParams();

    useEffect(() => {
        if (levelGroupId && levelId) {
            let [levelGroupIdTemp, levelIdTemp] = [0, 0, 0];
            try {
                [levelGroupIdTemp, levelIdTemp] = [parseInt(levelGroupId), parseInt(levelId)];
                setLevelGroupIdNum(levelGroupIdTemp);
                setLevelId(levelIdTemp);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(String(error));
                }
                return;
            }

            let errCurrentDeck = getDeck(levelGroupIdTemp, levelIdTemp);
            if (typeof errCurrentDeck === 'string') {
                setError(errCurrentDeck);
            } else {
                const currentCards = shuffle(
                    errCurrentDeck.flashcards.map((value, i) => {
                        return {
                            ...value,
                            id: i + 1
                        }
                    })
                ).sort((a, b) => a.strength - b.strength);

                setTitle(errCurrentDeck.title);
                setFlashcardQueue(currentCards);

                const currentFlashcard = currentCards.find(card => card.id === currentCards[0].id);
                if (!currentFlashcard) {
                    setError("Card doesn't exist anymore (rare error)");
                } else {
                    checkHelp(currentFlashcard);
                }
            }
        } else {
            setError('Broken url sub-path');
        }
    }, []);

    const checkHelp = (flashcard?: FlashcardWithId) => {
        if (flashcard) {
            const currentHelp = flashcard.help;
            if (currentHelp) {
                setHelpState(true);
            } else {
                setHelpState(false);
            }
        } else {
            if (!flaschardQueue[0]) return;
            const currentHelp = flaschardQueue[0].help;
            if (currentHelp) {
                setHelpState(true);
            } else {
                setHelpState(false);
            }
        }
    }

    const nextCard = (strength?: number) => {
        if (!flaschardQueue[0]) return;
        if (strength) {
            setFlashcardStrength(
                levelGroupIdNum,
                levelIdNum,
                flaschardQueue[0].id,
                strength
            ); 
        }

        let newItem;

        if (flaschardQueue.length < 2) {
            setFinished(true);
            setLevelCompletion(
                levelGroupIdNum,
                levelIdNum
            );
            return;
        } else {
            // TODO: improve removing first item
            if (!flaschardQueue[0]) return;
            newItem = flaschardQueue[1]
            setFlashcardQueue(flaschardQueue.slice(1));
        }
        
        setButtonStates(false);
        setHelpUse(false);
        checkHelp(newItem);
    }

    const cardResponse = (correct: boolean) => {
        if (!flaschardQueue[0]) return;
        const strength = calculateStrength(
            flaschardQueue[0].strength, 
            helpUse, 
            1,
            correct
        );
        nextCard(strength);
    }

    const showHelp = () => {
        setHelpUse(true);

        if (!flaschardQueue[0]) return;
        const currentHelp = flaschardQueue[0].help;
        if (currentHelp) window.alert(currentHelp);
    }

    // true: front, false: back
    function getCardContent(side: boolean): string {
        const currentFlashcard = flaschardQueue[0];
        if (!currentFlashcard) return '';
        return side ? currentFlashcard.front : currentFlashcard.back;
    };

    return (
        <>
            <div className='mainpage'>
                <div className='tile-collection'>
                    <div className="tile full-width">
                        {
                            error === null ? (
                                <>
                                    <h2>{title}</h2>
                                    <div className='flashcard-full'>
                                        <Card 
                                            key={flaschardQueue.length > 1 ? flaschardQueue[0].id :  0}
                                            front={getCardContent(true)} 
                                            back={getCardContent(false)}
                                            lastCard={flaschardQueue.length < 2}
                                            done={finished}
                                            setBtn={setButtonStates}
                                            setHelp={setHelpState}
                                        ></Card>
                                    </div>
                                    <BtnList 
                                        btnState={buttonStates}
                                        helpState={helpState}
                                        helpFn={showHelp}
                                        responseFn={cardResponse}
                                    ></BtnList>
                                </>
                            ) : (
                                <h2>Error: {error}</h2>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Flashcards;