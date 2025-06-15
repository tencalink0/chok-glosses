import { sampleCourse } from "./MainPage";
import type { Course } from "../modules/Types";

const CourseList: Course[] = [ sampleCourse ];

function Courses() {
    return (
        <>
            <div className="mainpage">
                <div className='tile-collection'>
                    <div className="tile full">

                    </div>
                    <div className="tile medium">
                        <h2>Courses</h2>
                        <ul>
                            {CourseList.length > 0 ? (
                                CourseList.map((course, index) => (
                                    <li className="hover-shift">
                                        <span className="before-text">{course.emoji ? course.emoji : '▶'}</span>
                                        <span id={`course${index}`}>{course.title}</span>
                                    </li>
                                ))
                            ) : (
                                <li>Hmmm, seems like you have no courses. Consider <a className="green-highlight">uploading</a> one</li>
                            )
                            }
                        </ul>
                    </div>
                    <div className="tile full center-content">
                        <button className="button-green">Upload</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Courses;