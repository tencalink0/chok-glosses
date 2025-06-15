import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/Flashcard.css';

export interface Deck {
    title: string;
    flashcards: Flashcard[];
}

export interface Flashcard {
    front: string,
    back: string,
    help?: string
}

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

const Flashcard = () => {
    const [error, setError] = useState<string | null>(null);
    const [currentDeck, setCurrentDeck] = useState<Deck | undefined>(undefined);

    const [title, setTitle] = useState<string | undefined>(undefined);
    const [flashcard, setFlashcards] = useState<Flashcard[] | undefined>(undefined);
    const { deckId, cardId } = useParams();

    useEffect(() => {
        const currentCourse = localStorage.getItem('currentCourse');
        if (currentCourse) {
            let rawCurrentDeck = localStorage.getItem(`|${currentCourse}`);
            if (rawCurrentDeck) {
                try {
                    setCurrentDeck(JSON.parse(rawCurrentDeck));
                } catch {
                    setError('Failed to parse deck');
                }
            } else {
                setError("Course doesn't exist");
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
                            
                            <>{deckId ?? 'none'}{cardId ?? 'none'}</>
                        }
                        <Card front={'hi'} back={'bye'}></Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Flashcard;