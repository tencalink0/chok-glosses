import { useEffect, useState } from "react";
import type { Course, Deck, Flashcard } from '../modules/Types';
import { getCurrentCourse } from "../modules/LocalStorage";
import { DeckSchema } from "../modules/Schema";
import { useNavigate } from "react-router-dom";
import { LoadingBar } from "../Maintenance";
import PageLayout from "../modules/PageLayouts";

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
                if (DeckSchema.safeParse(levelContent).success) {
                    (levelContent as Deck).flashcards.forEach((card) => {
                        console.log(card);
                        if (card.strength !== 0) localCards.push(card);
                    });
                }
            });
        });

        setCards(localCards.sort((a, b) => a.strength - b.strength));
        console.log(localCards);
    }

    return (
        <PageLayout.MainSide
            childrenMain={
                <>
                    <h1 style={{
                        textAlign: 'center'
                    }}>Practice</h1>
                    {
                        cards && cards.length > 0 ? (
                            <table className='leaderboards'>
                                <thead>
                                    <tr>
                                        <th>Card</th>
                                        <th>Strength</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cards?.map((card, i) => (
                                            <tr key={i}>
                                                <td>{card.front}</td>
                                                <td>
                                                    <LoadingBar 
                                                        progress={card.strength * 100} 
                                                        extraMargin={false}
                                                    >
                                                        {`${(card.strength * 100).toFixed(0)}%`}
                                                    </LoadingBar>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        ) : (
                            <p key="none">Hmmm, seems like you haven't practiced any cards. Consider <a className="green-highlight" href="/">doing some lessons</a></p>
                        )
                    }
                </> 
            }
            childrenSide={
                <button className="button-green" onClick={() => navigate('/begin-practice')} disabled={error !== null}>Begin</button>
            }
            error={error}
            sideHidden
            reverseSideForMobile
            centerSides
        />
    );
}

export default Practice;