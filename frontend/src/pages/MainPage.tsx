import '../css/MainPage.css'
import Progress from '../modules/Progress';
import { getCurrentCourse } from '../modules/LocalStorage';

import type { LevelGroupColour, Course} from '../modules/Types';

import { useState, useEffect } from 'react';

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
                                        <Progress course={course} colors={colors}/>
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