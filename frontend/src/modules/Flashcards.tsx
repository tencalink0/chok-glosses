import confetti from 'canvas-confetti';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setFlashcardStrength, setLevelCompletion } from './LocalStorage';

import PageLayout from "./PageLayouts";
import type { Flashcard, FlashcardWithId } from './Types';
import { FlashcardWithIdSchema } from './Schema';

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

    console.log(prevStrength, newStrength);
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
    setHelp: (state: boolean) => void,
    resetKey?: number
}> = ({front, back, lastCard, done, setBtn, setHelp, resetKey}) => {
    const [ shownCard, setShownCard ] = useState(front);
    const [ flipped, setFlipped ] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        setShownCard(front);
        setFlipped(false);
    }, [resetKey, front]);

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

function Flashcards(
    {
        importedTitle,
        importedCards,
        error,
        levelGroupIdNum, 
        levelIdNum,
        allowLevelCompletion = false
    } : {
        importedTitle: string | undefined,
        importedCards: Flashcard[] | FlashcardWithId[],
        error: string | null,
        levelGroupIdNum?: number, 
        levelIdNum?: number,
        allowLevelCompletion?: boolean
    } 
) {
    const [ buttonStates, setButtonStates ] = useState<boolean>(false);
    const [ helpState, setHelpState ] = useState<boolean>(false);
    const [ helpUse, setHelpUse ] = useState<boolean>(false);
    const [ finished, setFinished ] = useState<boolean>(false);
    const [ resetKey, setResetKey ] = useState<number>(0);

    const [ flashcardQueue, setFlashcardQueue ] = useState<FlashcardWithId[]>([]);
    
    useEffect(() => {
        let currentCards: FlashcardWithId[];
        if (FlashcardWithIdSchema.safeParse(importedCards).success) {
            currentCards = importedCards as FlashcardWithId[];
        } else {
            if (!levelGroupIdNum || !levelIdNum) {
                error = 'Level identification required';
                levelGroupIdNum = 1;
                levelIdNum = 1;
            }

            currentCards = shuffle(
                importedCards.map((value, i) => {
                    return {
                        ...value,
                        id: i + 1,
                        levelId: levelIdNum,
                        levelGroupId: levelGroupIdNum
                    }
                })
            ).sort((a, b) => a.strength - b.strength) as FlashcardWithId[];
        }

        setFlashcardQueue(currentCards);

        const currentFlashcard = currentCards[0];
        if (!currentFlashcard) {
            error = "Card doesn't exist anymore (rare error)";
        } else {
            checkHelp(currentFlashcard);
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
            if (!flashcardQueue[0]) return;
            const currentHelp = flashcardQueue[0].help;
            if (currentHelp) {
                setHelpState(true);
            } else {
                setHelpState(false);
            }
        }
    }

    const nextCard = (correct: boolean, newStrength?: number) => {
        setFlashcardQueue(prevQueue => {
            let updateQueue = prevQueue;

            if (newStrength !== undefined) {
                updateQueue = [
                    {
                        ...prevQueue[0],
                        strength: newStrength
                    },
                    ...prevQueue.slice(1)
                ]
            }

            if (newStrength !== undefined) {
                setFlashcardStrength(
                    prevQueue[0].levelGroupId, 
                    prevQueue[0].levelId, 
                    prevQueue[0].id, 
                    newStrength
                );
            }

            let newQueue;

            if (!correct) {
                const firstItem = updateQueue[0];
                newQueue = updateQueue.slice(1).concat(firstItem);
            } else if (updateQueue.length < 2) {
                setFinished(true);
                if (allowLevelCompletion) {
                    if (!levelGroupIdNum || !levelIdNum) {
                        error = 'Failed to get Ids'
                    } else {
                        setLevelCompletion(
                            levelGroupIdNum, 
                            levelIdNum
                        );
                    }
                }
                return updateQueue;
            } else {
                newQueue = updateQueue.slice(1);
            }

            const newItem = newQueue[0];
            setResetKey(r => r + 1);
            setButtonStates(false);
            setHelpUse(false);
            checkHelp(newItem);

            return newQueue;
        });
    };

    const cardResponse = (correct: boolean) => {
        if (!flashcardQueue[0]) return;
        const strength = calculateStrength(
            flashcardQueue[0].strength, 
            helpUse, 
            1,
            correct
        );
        nextCard(correct, strength);
    }

    const showHelp = () => {
        setHelpUse(true);

        if (!flashcardQueue[0]) return;
        const currentHelp = flashcardQueue[0].help;
        if (currentHelp) window.alert(currentHelp);
    }

    // true: front, false: back
    function getCardContent(side: boolean): string {
        const currentFlashcard = flashcardQueue[0];
        if (!currentFlashcard) return '';
        return side ? currentFlashcard.front : currentFlashcard.back;
    };

    return (
        <PageLayout.Main
            children={
                <>
                    <h2>{importedTitle}</h2>
                    <div className='flashcard-full'>
                        <Card 
                            key={flashcardQueue.length > 1 ? flashcardQueue[0].id :  0}
                            front={getCardContent(true)} 
                            back={getCardContent(false)}
                            lastCard={flashcardQueue.length < 2}
                            done={finished}
                            setBtn={setButtonStates}
                            setHelp={setHelpState}
                            resetKey={resetKey}
                        ></Card>
                    </div>
                    <BtnList 
                        btnState={buttonStates}
                        helpState={helpState}
                        helpFn={showHelp}
                        responseFn={cardResponse}
                    ></BtnList>
                </>
            }
            error={error}
        />
    );
}

export default Flashcards;