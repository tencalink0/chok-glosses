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
    const helpStrength = 0.1;
    const correctStrength = 0.1;
    const timeStrength = 0.1;

    const modifier = 0;
    

    return prevStrength * modifier;
}

const BtnList: React.FC<{
    btnState: boolean, 
    helpState: boolean,
    helpFn: () => void
}> = ({btnState, helpState, helpFn}) => {


    return (
        <div className='button-collection-row'>
            <button className='button-green flashcard-btn' disabled={!btnState}>✔️</button>
            <button 
                className='button-green flashcard-btn' 
                disabled={!helpState}
                onClick={helpFn}
            >🤔</button>
            <button className='button-green flashcard-btn' disabled={!btnState}>❌</button>
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

    const checkHelp = (flashcard?: Flashcard) => {
        if (flashcard) {
            const currentHelp = flashcard.help;
            if (currentHelp) {
                setHelpState(true);
            }
        } else {
            if (!deckFlashcards) return;
            console.log(deckFlashcards[flashcardId-1]);
            const currentHelp = deckFlashcards[flashcardId-1].help;
            if (currentHelp) {
                setHelpState(true);
            }
        }
    }

    const nextCard = () => {
        if (flashcardId >= cardsTotal) {
            setFlashcardId(1);
        } else {
            setFlashcardId(flashcardId + 1);
        }
        checkHelp();
    }

    const prevCard = () => {
        if (flashcardId <= 1) {
            setFlashcardId(cardsTotal);
        } else {
            setFlashcardId(flashcardId - 1);
        }
        checkHelp();
    }

    const showHelp = () => {
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