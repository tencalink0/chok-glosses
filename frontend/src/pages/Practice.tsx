import { useEffect, useState } from "react";
import type { Course, Deck, Flashcard } from '../modules/Types';
import { getCurrentCourse } from "../modules/LocalStorage";
import { DeckSchema } from "../modules/Schema";
import { useNavigate } from "react-router-dom";
import { LoadingBar } from "../Maintenance";

function Practice() {
    const [ error, setError ] = useState<string | null>(null);
    const [ course, setCourse ] = useState<Course | undefined>(undefined);
    const [ cards, setCards ] = useState<Flashcard[] | undefined>(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        const errCurrentCourse = getCurrentCourse();
        if (typeof errCurrentCourse === 'string') {
            setError(errCurrentCourse);
        } else {
            setCourse(errCurrentCourse);
            loadAllCards(errCurrentCourse);
        }
    }, []);

    const loadAllCards = (localCourse?: Course) => {
        localCourse = localCourse ?? course;

        let localCards: Flashcard[] = [];

        if (!localCourse) return;
        localCourse.level_groups.forEach((level_group) => {
            level_group.tiles.forEach((level) => {
                const levelContent = level.content;
                if (DeckSchema.safeParse(levelContent)) {
                    (levelContent as Deck).flashcards.forEach((card) => {
                        if (card.strength !== 0) localCards.push(card);
                    });
                }
            });
        });

        setCards(localCards.sort((a, b) => a.strength - b.strength));
        console.log(localCards);
    }

    return (
        <div className='mainpage'>
                <div className='tile-collection'>
                    {
                        error === null ? (
                            <>
                                <div className="tile big">
                                    <h1 style={{
                                        textAlign: 'center'
                                    }}>Practice</h1>
                                    <table className='leaderboards'>
                                        <thead>
                                            <tr>
                                                <th>Card</th>
                                                <th>Strength</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cards?.map((card) => (
                                                    <tr>
                                                        <td>{card.front}</td>
                                                        <td>
                                                            <LoadingBar progress={card.strength * 100} extraMargin={false}/>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="tile full center-content">
                                    <button className="button-green" onClick={() => navigate('/begin-practice')}>Begin</button>
                                </div>
                            </>
                        ) : (
                            <div className="tile big">
                                <h2>Error: { error }</h2>
                            </div>
                        )
                    }
                </div>
        </div>
    );
}

export default Practice;