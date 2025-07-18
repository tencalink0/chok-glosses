import type { Course, LevelGroup, Level, Deck, Reading } from './Types';
import { ContentChoice } from './Enums'
import { mapContentType } from '../App'

export function getDeck(levelGroupId: number, deckId: number): Deck | string {
    const errCurrentLevel = getLevel(levelGroupId, deckId);
    if (typeof errCurrentLevel === 'string') {
        return errCurrentLevel;
    } else {
        const levelContent = errCurrentLevel.content;
        switch (mapContentType(levelContent)) {
            case ContentChoice.Flashcard: 
                return levelContent as Deck;
            default:
                return "The current level cannot be formatted as flashcards";
        }
    }
}

export function getReading(levelGroupId: number, deckId: number): Reading | string {
    const errCurrentLevel = getLevel(levelGroupId, deckId);
    if (typeof errCurrentLevel === 'string') {
        return errCurrentLevel;
    } else {
        const levelContent = errCurrentLevel.content;
        switch (mapContentType(levelContent)) {
            case ContentChoice.Reading: 
                return levelContent as Reading;
            default:
                return "The current level cannot be formatted as flashcards";
        }
    }
}

export function getAllCourses(): Course[] | string {
    const courses = localStorage.getItem('courses');
    if (courses) {
        try {
            const json: Course[] = JSON.parse(courses);
            return json;
        } catch {
            return 'Failed to parse JSON data';
        }
    } else {
        return 'No courses available';
    }
}

export function getCurrentCourseTitle() {
    return localStorage.getItem('currentCourse');
}

export function deleteCourse(courseTitle: string) {
    const errAllCourses = getAllCourses();
    if (typeof errAllCourses === 'string') return errAllCourses;
    const cleanCourseList = errAllCourses.filter(item => item.title !== courseTitle);
    localStorage.setItem('courses', JSON.stringify(cleanCourseList));
}

export function getCurrentCourse(): Course | string {
    const currentCourseTitle = localStorage.getItem('currentCourse');
    if (currentCourseTitle) {
        const errAllCourses = getAllCourses();
        if (typeof errAllCourses === 'string') {
            return errAllCourses;
        } else {
            if (errAllCourses.length < 1) return 'No courses available';
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
            return currentLevelGroups[levelGroupId - 1];
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
            return currentLevels[levelId - 1];
        } else {
            return "Deck doesn't exist";
        }
    }
}

export function writeCourse(course: Course): string | null {
    let errAllCourses = getAllCourses();
    if (typeof errAllCourses === 'string') {
        return setCourse(course);
    } else {
        if (errAllCourses.find(aCourse => aCourse.title === course.title)) {
            const newCourseArray = errAllCourses.map((aCourse) => 
                aCourse.title === course.title ? course : aCourse
            );
            localStorage.setItem('courses', JSON.stringify(newCourseArray));
            return null;
        } else {
            return "Course doesn't exist";
        }
    }
}

export function setCourse(course: Course): string | null {
    let errAllCourses = getAllCourses();
    if (typeof errAllCourses === 'string') {
        localStorage.setItem('currentCourse', course.title);
        localStorage.setItem('courses', JSON.stringify([course]));
        return null;
    } else {
        if (errAllCourses.find(aCourse => aCourse.title === course.title)) {
            return 'Course with the same name exists';
        }
        errAllCourses.push(course);
        localStorage.setItem('currentCourse', course.title);
        localStorage.setItem('courses', JSON.stringify(errAllCourses));
        return null;
    }
}

export function setFlashcardStrength(
    levelGroupId: number, 
    levelId: number, 
    cardId: number, 
    strength: number
) : string | null {
    let errCurrentCourse = getCurrentCourse();
    if (typeof errCurrentCourse === 'string') return errCurrentCourse;
    const errDeck = getDeck(levelGroupId, levelId);
    if (typeof errDeck === 'string') return errDeck;
    if (errDeck.flashcards.length < cardId) return 'CardId out of range';

    const levelGroup = errCurrentCourse.level_groups[levelGroupId-1];
    const level = levelGroup.tiles[levelId-1];
    (level.content as Deck).flashcards[cardId - 1].strength = strength;
    writeCourse(errCurrentCourse);

    return null;
}

export function setLevelCompletion(
    levelGroupId: number, 
    levelId: number,
    completeState = true
): string | null {
    let errCurrentCourse = getCurrentCourse();
    if (typeof errCurrentCourse === 'string') return errCurrentCourse;

    let errCurrentLevel = getLevel(levelGroupId, levelId);
    if (typeof errCurrentLevel === 'string') return errCurrentLevel;

    const newCourse = structuredClone(errCurrentCourse);
    const levelGroup = newCourse.level_groups[levelGroupId-1];
    const level = levelGroup.tiles[levelId-1];
    level.completed = completeState;
    writeCourse(newCourse);

    return null;
}

export function setSentenceCompletion(
    levelGroupId: number, 
    levelId: number,
    sentenceId: number,
    completeState = true
) {
    let errCurrentCourse = getCurrentCourse();
    if (typeof errCurrentCourse === 'string') return errCurrentCourse;
    const errDeck = getReading(levelGroupId, levelId);
    if (typeof errDeck === 'string') return errDeck;
    if (errDeck.sentences.length < sentenceId) return 'SentenceId out of range';

    const levelGroup = errCurrentCourse.level_groups[levelGroupId-1];
    const level = levelGroup.tiles[levelId-1];
    (level.content as Reading).sentences[sentenceId - 1].completed = completeState;
    console.log(errCurrentCourse);
    writeCourse(errCurrentCourse);

    return null;
}