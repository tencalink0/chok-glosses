import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/Flashcard.css';
import { getLevel } from '../modules/Progress';

import { ContentChoice } from '../modules/Enums';
import type { ContentType, Deck, Flashcard } from '../modules/Types';

export const TestDeck: Deck = {
    title: 'Term 1 Content',
    flashcards: [
        {
            front: 'Question1',
            back: 'Answer1'
        },
        {
            front: 'Question2',
            back: 'Answer2'
        },
        {
            front: 'Question3',
            back: 'Answer3'
        }
    ]
}

export const TestDeckContentType: ContentType = {
    description: ContentChoice.Flashcard,
    content: TestDeck
}

export function getDeck(levelGroupId: number, deckId: number): Deck | string {
    const errCurrentLevel = getLevel(levelGroupId, deckId);
    if (typeof errCurrentLevel === 'string') {
        return errCurrentLevel;
    } else {
        const levelContentType =  errCurrentLevel.content;
        switch (levelContentType.description) {
            case ContentChoice.Flashcard: 
                return levelContentType.content as Deck;
            default:
                return "The current level isn't a deck";
        }
    }
}

const Card: React.FC<Flashcard> = ({front, back, help}) => {
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
                {shownCard}
            </div>
        </div>
    );
};

const Flashcards = () => {
    const [ error, setError ] = useState<string | null>(null);

    const [ title, setTitle ] = useState<string | undefined>(undefined);
    const [ deckFlashcards, setDeckFlashcards ] = useState<Flashcard[] | undefined>(undefined);
    const [ flashcardId, setFlashcardId ] = useState<number>(1);
    const { levelGroupId, levelId, cardId } = useParams();

    useEffect(() => {
        if (levelGroupId && levelId) {
            try {
                const [levelGroupIdNum, levelIdNum] = [parseInt(levelGroupId), parseInt(levelId)];
                let errCurrentDeck = getDeck(levelGroupIdNum, levelIdNum);
                if (typeof errCurrentDeck === 'string') {
                    setError(errCurrentDeck);
                } else {
                    setTitle(errCurrentDeck.title);
                    setDeckFlashcards(errCurrentDeck.flashcards);
                }
            } catch {
                console.log('Failed to parse url path');
            }
        }

        setFlashcardId(1);
    }, []);

    return (
        <>
            <div className='mainpage'>
                <div className='tile-collection'>
                    <div className="tile full-width">
                        {
                            error === null && deckFlashcards && flashcardId ? (
                                <>
                                    <h2>{title}</h2>
                                    {levelGroupId ?? 'none'}{levelId ?? 'none'}{cardId ?? 'none'}
                                    <Card front={deckFlashcards[flashcardId].front} back={deckFlashcards[flashcardId].back}></Card>
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