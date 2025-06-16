import '../css/MainPage.css'
import Progress, { getCurrentCourse } from '../modules/Progress';

import { ContentChoice, LevelGroupColourChoice } from '../modules/Enums';
import type { LevelGroupColour, LevelGroup, Course, Level} from '../modules/Types';

import { useState, useEffect } from 'react';
import { TestDeckContentType } from './Flashcards';

export const sampleCourse: Course = {
    title: "Test Introduction",
    level_groups: [
        {
            title: 'The basics',
            color: LevelGroupColourChoice.Green,
            tiles: [
                { completed: true, stars: 3, description: 'Try me', content: TestDeckContentType } satisfies Level,
                { completed: false, stars: 0, content: TestDeckContentType} satisfies Level
            ]
        },
        {
            title: 'Basics 2',
            color: LevelGroupColourChoice.Red,
            tiles: [
                { completed: true, stars: 3, description: 'hey', content: { description: ContentChoice.ComingSoon, content: null }} satisfies Level,
                { completed: false, stars: 0, content: { description: ContentChoice.ComingSoon, content: null }} satisfies Level,
                { completed: true, stars: 0, content: { description: ContentChoice.ComingSoon, content: null }} satisfies Level,
                { completed: false, stars: 0, content: { description: ContentChoice.ComingSoon, content: null }} satisfies Level
            ]
        },
        {
            title: 'Food',
            color: LevelGroupColourChoice.Purple,
            tiles: [
                { completed: true, stars: 2, content: { description: ContentChoice.ComingSoon, content: null }} satisfies Level,
                { completed: true, stars: 1, content: { description: ContentChoice.ComingSoon, content: null }} satisfies Level
            ]
        }
    ] as LevelGroup[]
};

function MainPage() {
    const [ error, setError ] = useState<string | null>(null);
    const [ course, setCourse ] = useState<Course | undefined>(undefined);

    const [colors, setColors] = useState<LevelGroupColour>({
        Red: 'red',
        Green: 'green',
        Purple: 'purple',
        Orange: 'orange'
    });

    const loadCourse = () => {
        const errCurrentCourse = getCurrentCourse()
        if (typeof errCurrentCourse === 'string') {
            setError(errCurrentCourse);
        } else {
            setCourse(errCurrentCourse);
        }
    };

    useEffect(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        setColors({
            Red: rootStyles.getPropertyValue('--level-red').trim(),
            Green: rootStyles.getPropertyValue('--level-green').trim(),
            Purple: rootStyles.getPropertyValue('--level-purple').trim(),
            Orange: rootStyles.getPropertyValue('--level-orange').trim(),
        });
        loadCourse();
    }, []);

    return(
        <>  
            <div className='mainpage'>
                <div className='tile-collection'>
                        {
                            error === null && course ? (
                                <>
                                    <div className="tile big full">
                                        <Progress course={sampleCourse} colors={colors}/>
                                    </div>
                                    <div className="tile">
                                        <table className='leaderboards'>
                                            <tbody>
                                                <tr>
                                                    <th>Leaderboards</th>
                                                </tr>
                                                <tr>
                                                    <td>Player 1</td>
                                                </tr>
                                                <tr>
                                                    <td>Player 2</td>
                                                </tr>
                                                <tr>
                                                    <td>Player 3</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            ) : (
                                <div className="tile full-width">
                                    <h2>Error: { error }</h2>
                                </div>
                            )
                        }
                    
                </div>
            </div>
        </>
    );
}

export default MainPage;