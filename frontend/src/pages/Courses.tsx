import type { Course } from "../modules/Types";
import { useEffect, useState } from "react";
import { getAllCourses } from "../modules/Progress";
import { useNavigate } from 'react-router-dom';

function Courses() {
    const navigate = useNavigate();
    const [ error, setError ] = useState<string | null>(null);
    const [ courses, setCourses ] = useState<Course[] | undefined>(undefined);

    useEffect(() => {
        const allCourses = getAllCourses();
        if (typeof allCourses === 'string') {
            setError(allCourses);
        } else {
            setCourses(allCourses);
        }
    }, []);

    return (
        <>
            <div className="mainpage">
                <div className='tile-collection'>
                    <div className="tile full">
                        
                    </div>
                    <div className="tile medium">
                        <h2>Courses</h2>
                        <ul>
                            {courses && courses.length > 0 ? (
                                courses.map((course, index) => (
                                    <li className="hover-shift">
                                        <span className="before-text">{course.emoji ? course.emoji : '▶'}</span>
                                        <span id={`course${index}`}>{course.title}</span>
                                    </li>
                                ))
                            ) : (
                                <li>Hmmm, seems like you have no courses. Consider <a className="green-highlight" href="/upload">uploading</a> one</li>
                            )
                            }
                        </ul>
                    </div>
                    <div className="tile full center-content">
                        <button className="button-green" onClick={() => navigate('/upload')}>Upload</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Courses;