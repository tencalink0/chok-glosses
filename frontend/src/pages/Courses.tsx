import { sampleCourse } from "./MainPage";'';
import type { Course } from "../modules/Progress";

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
                            {CourseList.map((course, _) => (
                                <li className="hover-shift">
                                    <span className="before-text">{course.emoji ? course.emoji : '▶'}</span>
                                    {course.title}
                                </li>
                            ))}
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