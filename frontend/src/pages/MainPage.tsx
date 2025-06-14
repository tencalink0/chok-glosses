import '../css/MainPage.css'
import Progress from '../modules/Progress';
import type { LevelGroup, Course } from '../modules/Progress';
import { useState, useEffect} from 'react';

export interface LevelGroupColour {
    Red: string;
    Green: string;
    Purple: string;
    Orange: string;
};

export const LevelGroupColourChoice = {
    Red: 'red', 
    Green: 'green',
    Purple: 'purple', 
    Orange: 'oranges'
};

export const LevelIconChoice = {
    Flashcard: 'flashcard',
    Reading: 'reading',
    Writing: 'writing',
    Listening: 'listening'
} 

export type LevelGroupColourChoice = typeof LevelGroupColourChoice[keyof typeof LevelGroupColourChoice];
export type LevelIconChoice = typeof LevelIconChoice[keyof typeof LevelIconChoice];

export const sampleCourse: Course = {
    title: "Test Introduction",
    level_groups: [
        {
            title: 'The basics',
            color: LevelGroupColourChoice.Green,
            tiles: [
                { completed: true, stars: 3, icon: LevelIconChoice.Flashcard },
                { completed: false, stars: 0, icon: LevelIconChoice.Listening }
            ]
        },
        {
            title: 'Basics 2',
            color: LevelGroupColourChoice.Red,
            tiles: [
                { completed: true, stars: 3, description: 'hey' },
                { completed: false, stars: 0 },
                { completed: true, stars: 0 },
                { completed: false, stars: 0 }
            ]
        },
        {
            title: 'Food',
            color: LevelGroupColourChoice.Purple,
            tiles: [
                { completed: true, stars: 2 },
                { completed: true, stars: 1 }
            ]
        }
    ] as LevelGroup[]
};

function MainPage() {
    const [colors, setColors] = useState<LevelGroupColour>({
        Red: 'red',
        Green: 'green',
        Purple: 'purple',
        Orange: 'orange'
    });

    useEffect(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        setColors({
            Red: rootStyles.getPropertyValue('--level-red').trim(),
            Green: rootStyles.getPropertyValue('--level-green').trim(),
            Purple: rootStyles.getPropertyValue('--level-purple').trim(),
            Orange: rootStyles.getPropertyValue('--level-orange').trim(),
        });
    }, []);

    return(
        <>  
            <div className='mainpage'>
                <div className='tile-collection'>
                    <div className="tile big full">
                        <Progress course={sampleCourse} colors={colors}/>
                    </div>
                    <div className="tile">
                        <table className='leaderboards'>
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
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPage;