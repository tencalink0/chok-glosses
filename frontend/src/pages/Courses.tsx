import type { Course } from "../modules/Types";
import { useEffect, useState } from "react";
import { getAllCourses, getCurrentCourseTitle, deleteCourse } from "../modules/LocalStorage";
import { useNavigate } from "react-router-dom";
import { Confirm } from "./Upload";
import PageLayout from "../modules/PageLayouts";

function Courses() {
    const navigate = useNavigate();
    const [ courses, setCourses ] = useState<Course[] | undefined>(undefined);
    const [ localCourseTitle, setLocalCourseTitle ] = useState<string | null>(null);
    const [ preDeleteTitle, setPreDeleteTitle ] = useState<string | null>(null);

    const updateCurrentCourse = (title: string) => {
        localStorage.setItem('currentCourse', title);
        navigate('/');
    }

    useEffect(() => {
        const allCourses = getAllCourses();
        setLocalCourseTitle(getCurrentCourseTitle());
        if (typeof allCourses === 'string') {
            console.log(`Error: ${allCourses}`);
        } else {
            setCourses(allCourses);
            console.log(`Courses: ${courses?.map(course => course.title).join(', ')}, ${courses?.length}`);
        }
    }, []);

    const showWarn = (title: string) => {
        setPreDeleteTitle(title);
        const messageContainer = document.getElementById('message-container');
        if (!messageContainer) return;

        messageContainer.style.display = 'flex';
    }


    const hideWarn = () => {
        const messageContainer = document.getElementById('message-container');
        if (!messageContainer) return;

        messageContainer.style.display = 'none';
    }

    const clearCourse = (courseTitle: string) => {
        deleteCourse(courseTitle);
        window.location.reload();
    }

    return (
        <>
            <div id="message-container">
                <div className="tile">
                    <h2>Warning</h2>
                    <p className="text-small">Are you sure you want to delete <span style={{color: 'var(--blue)'}}>{preDeleteTitle}</span>?</p>
                    <p className="text-small" style={{color: 'var(--red)'}}>This is Irreversible</p>
                    <Confirm hideWarn={hideWarn} successFunc={() => {if (preDeleteTitle) clearCourse(preDeleteTitle)}}/>
                </div>
            </div>
            <PageLayout.SideMainSide 
                childrenMain={
                    <>
                        <h2>Courses</h2>
                        <ul>
                            {courses && courses.length > 0 ? (
                                courses.map((course, _) => (
                                    <li className="hover-shift" style={{
                                        color: localCourseTitle === course.title ? 'var(--green)' : 'var(--grey-dark)'
                                    }}>
                                        <div onClick={() => {
                                            updateCurrentCourse(course.title)
                                        }}>
                                            <span className="before-text">{course.emoji ? course.emoji : '▶'}</span>
                                            <span className="course-title">{course.title}</span>
                                        </div>
                                        <div>
                                            <span className="before-text">❌</span>
                                            <span className="below-text" onClick={
                                                () => showWarn(course.title)
                                            }>Delete</span>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li key="none">Hmmm, seems like you have no courses. Consider <a className="green-highlight" href="/upload">uploading</a> one</li>
                            )
                            }
                        </ul>
                    </>
                }
                childrenSide2={
                    <button className="button-green" onClick={() => navigate('/upload')}>Upload</button>
                }
                sideHidden={true}
            />
        </>
    );
}

export default Courses;