import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import '../css/Flashcard.css';
import { getDeck } from '../modules/LocalStorage';
import Flashcards from '../modules/Flashcards';
import type { Flashcard } from '../modules/Types';

const FlashcardsSection = () => {
    const [ error, setError ] = useState<string | null>(null);
    const [ isLoaded, setIsLoaded ] = useState<boolean>(false);

    const [ title, setTitle ] = useState<string | undefined>(undefined);
    const [ cards, setCards ] = useState<Flashcard[]>([]);

    const [ levelGroupIdNum, setLevelGroupIdNum ] = useState<number>(1);
    const [ levelIdNum, setLevelIdNum ] = useState<number>(1);

    const { levelGroupId, levelId } = useParams();

    useEffect(() => {
        if (levelGroupId && levelId) {
            let [levelGroupIdTemp, levelIdTemp] = [0, 0];
            try {
                [levelGroupIdTemp, levelIdTemp] = [parseInt(levelGroupId), parseInt(levelId)];
                setLevelGroupIdNum(levelGroupIdTemp);
                setLevelIdNum(levelIdTemp);
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
                setTitle(errCurrentDeck.title);
                setCards(errCurrentDeck.flashcards);
                
                setIsLoaded(true);
            }
        } else {
            setError('Broken url sub-path');
        }
    }, []);

    if (!isLoaded) return <div>Loading...</div>;
    
    return (
        <Flashcards
            importedTitle={title}
            importedCards={cards}
            error={error}
            levelGroupIdNum={levelGroupIdNum}
            levelIdNum={levelIdNum}
            allowLevelCompletion
        />
    );
}

export default FlashcardsSection;