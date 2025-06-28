import { useEffect, useState } from "react";
import type { Course } from '../modules/Types';
import { getCurrentCourse } from "../modules/LocalStorage";

function Practice() {
    const [ error, setError ] = useState<string | null>(null);
    const [ course, setCourse ] = useState<Course | undefined>(undefined);

    useEffect(() => {
        const errCurrentCourse = getCurrentCourse();
        if (typeof errCurrentCourse === 'string') {
            setError(errCurrentCourse);
        } else {
            setCourse(errCurrentCourse);
        }
    }, []);

    const loadAllCards = () => {

    }

    return (
        <div className='mainpage'>
                <div className='tile-collection'>
                    <div className="tile big">
                        {
                            error === null ? (
                                <>
                                    <h1 style={{
                                        textAlign: 'center'
                                    }}>Practice</h1>
                                    {
                                        
                                    }
                                </>
                            ) : (
                                <h2>Error: { error }</h2>
                            )
                        }
                    </div>
                </div>
        </div>
    );
}

export default Practice;