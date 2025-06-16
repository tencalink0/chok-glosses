import type { Course, LevelGroup, Level } from './Types';

export function getAllCourses(): Course[] | string {
    const courses = localStorage.getItem('courses');
    if (courses) {
        try {
            const json: Course[] = JSON.parse(courses);
            return json;
        } catch {
            return 'Failed to parse JSON data'
        }
    } else {
        return 'No courses available';
    }
}

export function getCurrentCourse(): Course | string {
    const currentCourseTitle = localStorage.getItem('currentCourse');
    if (currentCourseTitle) {
        const errAllCourses = getAllCourses();
        if (typeof errAllCourses === 'string') {
            return errAllCourses;
        } else {
            const foundCourse = errAllCourses.find(item => item.title === currentCourseTitle);
            return foundCourse ?? "Course doesn't exist";
        }
    } else {
        return "No course selected";
    }
}

export function getLevelGroup(levelGroupId: number): LevelGroup | string {
    const errCurrentCourse = getCurrentCourse();
    if (typeof errCurrentCourse === 'string') {
        return errCurrentCourse;
    } else {
        const currentLevelGroups = errCurrentCourse.level_groups;
        if (currentLevelGroups.length >= levelGroupId) {
            return currentLevelGroups[levelGroupId + 1];
        } else {
            return "LevelGroup doesn't exist";
        }
    }
}

export function getLevel(levelGroupId: number, levelId: number): Level | string {
    const errCurrentCourse = getLevelGroup(levelGroupId);
    if (typeof errCurrentCourse === 'string') {
        return errCurrentCourse;
    } else {
        const currentLevels = errCurrentCourse.tiles;
        if (currentLevels.length >= levelId) {
            return currentLevels[levelId + 1];
        } else {
            return "Deck doesn't exist";
        }
    }
}

export function setCourse(course: Course): string | null {
    let errAllCourses = getAllCourses();
    if (typeof errAllCourses === 'string') return errAllCourses;

    errAllCourses.push(course);
    localStorage.setItem('currentCourse', course.title);
    localStorage.setItem('courses', JSON.stringify(errAllCourses));
    return null;
}