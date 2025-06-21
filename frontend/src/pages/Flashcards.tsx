import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/Flashcard.css';
import { getLevel } from '../modules/LocalStorage';

import { ContentChoice } from '../modules/Enums';
import type { Deck, Flashcard } from '../modules/Types';

export function getDeck(levelGroupId: number, deckId: number): Deck | string {
    const errCurrentLevel = getLevel(levelGroupId, deckId);
    if (typeof errCurrentLevel === 'string') {
        return errCurrentLevel;
    } else {
        const levelContentType = errCurrentLevel.content;
        switch (levelContentType.description) {
            case ContentChoice.Flashcard: 
                return levelContentType.content as Deck;
            default:
                return "The current level isn't a deck";
        }
    }
}

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
    const { levelGroupId, levelId, cardId } = useParams();

    useEffect(() => {
        if (levelGroupId && levelId && cardId) {
            let [levelGroupIdNum, levelIdNum, cardIdNum] = [0, 0, 0];
            try {
                [levelGroupIdNum, levelIdNum, cardIdNum] = [parseInt(levelGroupId), parseInt(levelId), parseInt(cardId)];
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(String(error));
                }
                return;
            }

            let errCurrentDeck = getDeck(levelGroupIdNum, levelIdNum);
            if (typeof errCurrentDeck === 'string') {
                setError(errCurrentDeck);
            } else {
                if (errCurrentDeck.flashcards.length < cardIdNum) {
                    setError('Card Id Out of Range');
                } else {
                    setTitle(errCurrentDeck.title);
                    setDeckFlashcards(errCurrentDeck.flashcards);
                    setCardsTotal(errCurrentDeck.flashcards.length);
                    setFlashcardId(cardIdNum);
                    checkHelp(errCurrentDeck.flashcards[cardIdNum-1]);
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

    const nextCard = () => {
        let newId = 0;
        if (flashcardId >= cardsTotal) {
            newId = 1;
        } else {
            newId = flashcardId + 1;
        }
        setFlashcardId(newId);

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
        }
        nextCard();
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