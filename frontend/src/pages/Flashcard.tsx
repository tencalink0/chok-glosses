import { useState } from 'react';
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

    return (
        <div className="flashcard-container">
            <div className="flashcard">
                {shownCard}
            </div>
        </div>
    );
};

const Flashcard = () => {
    const title = TestDeck.title;
    const flashcards = TestDeck.flashcards;

    return (
        <>
            <div className='mainpage'>
                <div className='tile-collection'>
                    <div className="tile full-width">
                        <h2>{title}</h2>
                        <Card front={'hi'} back={'bye'}></Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Flashcard;