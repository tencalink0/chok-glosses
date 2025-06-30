import '../css/MainPage.css'
import Progress from '../modules/Progress';
import { getCurrentCourse } from '../modules/LocalStorage';

import type { LevelGroupColour, Course} from '../modules/Types';

import { useState, useEffect } from 'react';
import { Title } from '../App';
import PageLayout from '../modules/PageLayouts';

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
            <PageLayout.MainSide
                childrenMain={
                    <Progress course={course ?? {
                        title: '',
                        level_groups: [],
                        version: 'pre0.1'
                    } as Course } colors={colors}/>
                }
                childrenSide={
                    <>
                        <table className='leaderboards'>
                            <thead>
                                <tr><th>Leaderboards</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Coming soon...</td></tr>
                            </tbody>
                        </table>

                        <table className='leaderboards'>
                            <thead>
                                <tr><th>Notices</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Coming soon...</td></tr>
                            </tbody>
                        </table>

                        <table className='leaderboards'>
                            <thead>
                                <tr><th>Sponsor {Title}</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>The sooner we can deploy, the better</td></tr>
                                <tr><td>Coming soon...</td></tr>
                            </tbody>
                        </table>
                    </>
                }
                mainHidden={true}
                error={error}
            /> 
        </>
    );
}

export default MainPage;