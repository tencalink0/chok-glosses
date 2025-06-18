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
        console.log(JSON.stringify(errCurrentLevel));
        const levelContentType = errCurrentLevel.content;
        switch (levelContentType.description) {
            case ContentChoice.Flashcard: 
                return levelContentType.content as Deck;
            default:
                return "The current level isn't a deck";
        }
    }
}

const PrevCardBtn: React.FC<{prevCard: () => void}> = ({prevCard}) => {
    return (
        <>
            <button onClick={prevCard} className='button-green'>◀</button>
        </>
    );
};

const NextCardBtn: React.FC<{nextCard: () => void}> = ({nextCard}) => {
    return (
        <>
            <button onClick={nextCard} className='button-green'>▶</button>
        </>
    );
};

const Card: React.FC<Flashcard> = ({front, back, help, strength}) => {
    const [shownCard, setShownCard] = useState(front);

    const handleClick = () => {
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
                setTitle(errCurrentDeck.title);
                setDeckFlashcards(errCurrentDeck.flashcards);
                setCardsTotal(errCurrentDeck.flashcards.length);
            }
        } else {
            setError('Broken url sub-path');
        }

        setFlashcardId(1);
    }, []);

    const nextCard = () => {
        if (flashcardId >= cardsTotal) {
            setFlashcardId(1);
        } else {
            setFlashcardId(flashcardId + 1);
        }
        console.log("here!");
    }

    const prevCard = () => {
        if (flashcardId <= 1) {
            setFlashcardId(cardsTotal);
        } else {
            setFlashcardId(flashcardId - 1);
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
                                        <PrevCardBtn prevCard={prevCard} />
                                        <Card 
                                            key={flashcardId}
                                            front={deckFlashcards[flashcardId-1].front} 
                                            back={deckFlashcards[flashcardId-1].back}
                                            strength={deckFlashcards[flashcardId-1].strength}
                                        ></Card>
                                        <NextCardBtn nextCard={nextCard} />
                                    </div>
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