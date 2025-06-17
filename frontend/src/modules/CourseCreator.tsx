import '../css/CourseCreator.css';
import type { Course } from './Types';

export function parseCourse(strCourse: string): Course | string {
    try {
        const json = JSON.parse(strCourse);
        return json as Course;
    } catch {
        return 'Failed to parse course';
    }
}

function CourseCreatorSelect() {
    return (
        <>  
            <div className="course-creator" id='courseCreator'>
                <span style={{color: 'var(--green)'}}>Coming soon...</span>
            </div>
        </>
    );
}

export default CourseCreatorSelect;