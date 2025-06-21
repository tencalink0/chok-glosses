import { useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/Flashcard.css';
import { getDeck, setFlashcardStrength } from '../modules/LocalStorage';
import type { Flashcard } from '../modules/Types';

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
    setBtn: (state: boolean) => void,
    setHelp: (state: boolean) => void
}> = ({front, back, setBtn, setHelp}) => {
    const [shownCard, setShownCard] = useState(front);

    const handleClick = () => {
        setBtn(true);
        setHelp(false);
        if (shownCard == front) {
            setShownCard(back);
        } else {
            setShownCard(front);
        }
    };

    return (
        <div className="flashcard-container">
            <div className="flashcard" onClick={handleClick}>
                <div className="flashcard-content">{shownCard}</div>
            </div>
        </div>
    );
};

const Flashcards = () => {
    const [ error, setError ] = useState<string | null>(null);
    const [ buttonStates, setButtonStates] = useState<boolean>(false);
    const [ helpState, setHelpState ] = useState<boolean>(false);
    const [ helpUse, setHelpUse ] = useState<boolean>(false);

    const [ title, setTitle ] = useState<string | undefined>(undefined);
    const [ deckFlashcards, setDeckFlashcards ] = useState<Flashcard[] | undefined>(undefined);
    const [ flashcardId, setFlashcardId ] = useState<number>(1);
    const [ cardsTotal, setCardsTotal ] = useState<number>(1);

    const [ levelGroupIdNum, setLevelGroupIdNum ] = useState<number>(1);
    const [ levelIdNum, setLevelId ] = useState<number>(1);

    const { levelGroupId, levelId } = useParams();
    const [searchParams] = useSearchParams();
    const cardId = searchParams.get("cardId");

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (levelGroupId && levelId && cardId) {
            let [levelGroupIdTemp, levelIdTemp, cardIdTemp] = [0, 0, 0];
            try {
                [levelGroupIdTemp, levelIdTemp, cardIdTemp] = [parseInt(levelGroupId), parseInt(levelId), parseInt(cardId)];
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
                if (errCurrentDeck.flashcards.length < cardIdTemp) {
                    setError('Card Id Out of Range');
                } else {
                    setTitle(errCurrentDeck.title);
                    setDeckFlashcards(errCurrentDeck.flashcards);
                    setCardsTotal(errCurrentDeck.flashcards.length);
                    setFlashcardId(cardIdTemp);
                    checkHelp(errCurrentDeck.flashcards[cardIdTemp-1]);
                }
            }
        } else {
            setError('Broken url sub-path');
        }
    }, []);

    const checkHelp = (flashcard?: Flashcard, newId?: number) => {
        if (flashcard) {
            const currentHelp = flashcard.help;
            if (currentHelp) {
                setHelpState(true);
            }
        } else {
            if (!deckFlashcards) return;
            if (newId) {
                const currentHelp = deckFlashcards[newId-1].help;
                if (currentHelp) {
                    setHelpState(true);
                }
            } else {
                const currentHelp = deckFlashcards[flashcardId-1].help;
                if (currentHelp) {
                    setHelpState(true);
                }
            }
        }
    }

    const nextCard = (strength?: number) => {
        let newId = 0;
        if (flashcardId >= cardsTotal) {
            newId = 1;
        } else {
            newId = flashcardId + 1;
        }
        setFlashcardId(newId);

        const params = new URLSearchParams(location.search);
        params.set("cardId", String(newId));
        navigate(`${location.pathname}?${params.toString()}`, { replace: true });

        if (!deckFlashcards) return;
        if (strength) {
            setFlashcardStrength(
                levelGroupIdNum,
                levelIdNum,
                newId,
                strength
            ); 
        }
        
        setButtonStates(false);
        setHelpUse(false);
        checkHelp(undefined, newId);
    }

    const cardResponse = (correct: boolean) => {
        if (deckFlashcards) {
            const strength = calculateStrength(
                deckFlashcards[flashcardId-1].strength, 
                helpUse, 
                1,
                correct
            );
            console.log(strength);
            nextCard(strength);
        } else {
            nextCard(0);
        }
    }

    const showHelp = () => {
        setHelpUse(true);
        if (!deckFlashcards) return;
        const currentHelp = deckFlashcards[flashcardId-1].help;
        if (currentHelp) {
            window.alert(currentHelp);
        }
    }

    return (
        <>
            <div className='mainpage'>
                <div className='tile-collection'>
                    <div className="tile full-width">
                        {
                            error === null && deckFlashcards && flashcardId ? (
                                <>
                                    <h2>{title}</h2>
                                    <div className='flashcard-full'>
                                        <Card 
                                            key={flashcardId}
                                            front={deckFlashcards[flashcardId-1].front} 
                                            back={deckFlashcards[flashcardId-1].back}
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