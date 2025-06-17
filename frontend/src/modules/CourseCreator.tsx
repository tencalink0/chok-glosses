import '../css/CourseCreator.css';
import type { Course } from './Types';
import { CourseSchema } from './Schema';

export function parseCourse(strCourse: string): Course | string {
    try {
        const json = JSON.parse(strCourse);
        const result = CourseSchema.safeParse(json);
        if (result.success) {
            return result.data;
        } else {
            console.error("Validation errors:", result.error.format());
            console.error("Full error object:", result.error); 
            return 'Parsed JSON is not a valid Course';
        }
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