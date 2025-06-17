import type { Course } from "../modules/Types";
import { useEffect, useState } from "react";
import { getAllCourses, getCurrentCourseTitle } from "../modules/LocalStorage";

function Courses() {
    const [ courses, setCourses ] = useState<Course[] | undefined>(undefined);
    const [ currentCourseTitle, setCurrentCourseTitle ] = useState<string | null>(null);

    const updateCurrentCourse = (title: string) => {
        setCurrentCourseTitle(title);
        window.location.href = '/';
    }

    useEffect(() => {
        const allCourses = getAllCourses();
        setCurrentCourseTitle(getCurrentCourseTitle);
        if (typeof allCourses === 'string') {
            console.log(`Error: ${allCourses}`);
        } else {
            setCourses(allCourses);
            console.log(`Courses: ${courses?.map(course => course.title).join(', ')}, ${courses?.length}`);
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
                                    <li className="hover-shift" style={{
                                        color: currentCourseTitle === course.title ? 'var(--green)' : 'var(--grey)'
                                    }}
                                        onClick={() => {
                                            updateCurrentCourse(course.title)
                                        }}
                                    >
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
                        <button className="button-green" onClick={() => window.location.href = '/upload'}>Upload</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Courses;