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
    const [error, setError] = useState<string | null>(null);
    const [currentDeck, setCurrentDeck] = useState<Deck | undefined>(undefined);

    const [title, setTitle] = useState<string | undefined>(undefined);
    const [flashcard, setFlashcards] = useState<Flashcard[] | undefined>(undefined);
    const { levelGroupId, levelId, cardId } = useParams();

    useEffect(() => {
        if (levelGroupId && levelId) {
            try {
                const [levelGroupIdNum, levelIdNum] = [parseInt(levelGroupId), parseInt(levelId)];
                let errCurrentDeck = getDeck(levelGroupIdNum, levelIdNum);
                if (typeof errCurrentDeck === 'string') {
                    setError(errCurrentDeck);
                } else {
                    setCurrentDeck(errCurrentDeck);
                }
            } catch {
                console.log('Failed to parse url path');
            }
        }

        setTitle(TestDeck.title);
        setFlashcards(TestDeck.flashcards);
    }, []);

    return (
        <>
            <div className='mainpage'>
                <div className='tile-collection'>
                    <div className="tile full-width">
                        <h2>{title}</h2>
                        {
                            
                            <>{levelGroupId ?? 'none'}{levelId ?? 'none'}{cardId ?? 'none'}</>
                        }
                        <Card front={'hi'} back={'bye'}></Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Flashcards;