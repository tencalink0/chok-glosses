import '../css/MainPage.css'
import Progress from '../modules/Progress';
import { getCurrentCourse } from '../modules/LocalStorage';

import type { LevelGroupColour, Course} from '../modules/Types';

import { useState, useEffect } from 'react';
import { Title } from '../App';
import PageLayout from '../modules/PageLayouts';
import { useNavigate } from 'react-router-dom';

function MainPage() {
    const [ error, setError ] = useState<string | null>(null);
    const [ course, setCourse ] = useState<Course | undefined>(undefined);

    const navigate = useNavigate();

    const [colors, setColors] = useState<LevelGroupColour>({
        Red: 'red',
        Green: 'green',
        Purple: 'purple',
        Orange: 'orange',
        Yellow: 'yellow',
        Blue: 'blue',
        Grey: 'grey'
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
            Yellow: rootStyles.getPropertyValue('--level-yellow').trim(),
            Blue: rootStyles.getPropertyValue('--level-blue').trim(),
            Grey: rootStyles.getPropertyValue('--level-grey').trim(),
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
                        <table className='list-table'>
                            <thead>
                                <tr><th>Leaderboards</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Coming soon...</td></tr>
                            </tbody>
                        </table>

                        <table className='list-table'>
                            <thead>
                                <tr><th>Articles</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>
                                    <a onClick={() => navigate('/article/getting-started')}>Getting started</a>
                                    <a onClick={() => navigate('/article/practice-explanation')}>How is strength calculated</a>   
                                </td></tr>
                            </tbody>
                        </table>

                        <table className='list-table'>
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