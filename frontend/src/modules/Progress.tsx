import { LevelGroupColourChoice, ContentChoice} from './Enums';
import type { LevelGroupColour, Course, LevelGroup, Level } from './Types';
import { useNavigate } from 'react-router-dom';

import bookIcon from '../img/icons/icons8-book-100.png';
import flashcardsIcon from '../img/icons/icons8-flashcards-100.png';
import speakerIcon from '../img/icons/icons8-speaker-100.png'
import writingIcon from '../img/icons/icons8-writing-100.png';

export interface ProgressProps {
    course: Course;
    colors: LevelGroupColour;
}

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
        const allCourses = getAllCourses();
        if (typeof allCourses === 'string') {
            return allCourses;
        } else {
            const foundCourse = allCourses.find(item => item.title === currentCourseTitle);
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

const Progress: React.FC<ProgressProps> = ({ course, colors }) => {
    const progress = course.level_groups;
    const navigate = useNavigate();

    const assignColor = (color: LevelGroupColourChoice | undefined) => {
        switch (color) {
            case 'red':
                return colors.Red;
            case 'green':
                return colors.Green;
            case 'purple':
                return colors.Purple;
            case 'orange':
                return colors.Orange;
            default:
                return '#ccc';
        }
    };

    const assignIcon = (levelTypeDescription: ContentChoice): string | undefined => {
        switch (levelTypeDescription) {
            case ContentChoice.Flashcard: 
                return flashcardsIcon;
            case ContentChoice.Reading: 
                return bookIcon;
            case ContentChoice.Writing: 
                return writingIcon;
            case ContentChoice.Listening: 
                return speakerIcon;
            default:
                return undefined;
        }
    }

    let globalTileIndex = 0;

    return (
        <>
            <h1 className='course-title'>{course.title}</h1>
            {progress.map((group, groupIndex) => (
                <div
                    key={groupIndex}
                    className="level-group"
                    style={{
                        background: assignColor(group.color),
                    }}
                >
                    <p className='title'>{`Tier ${groupIndex + 1} - ${group.title}`}</p>
                    {group.tiles.map((tile, tileIndex) => {
                        let className = 'level';
                        if (globalTileIndex % 8 === 1) {
                            className += ' right';
                        } else if (globalTileIndex % 8 === 2) {
                            className += ' right far';
                        } else if (globalTileIndex % 8 === 3) {
                            className += ' right';
                        } else if (globalTileIndex % 8 === 5) {
                            className += ' left';
                        } else if (globalTileIndex % 8 === 6) {
                            className += ' left far';
                        } else if (globalTileIndex % 8 === 7) {
                            className += ' left';
                        }
                        
                        const tileElement = (
                            <div
                                key={tileIndex}
                                className={className}
                                style={{ background: tile.completed ? 'var(--green)' : '' }}
                                onClick={() => navigate(`/${tile.content.description ? tile.content.description : 'mix'}/${groupIndex + 1}/${tileIndex + 1}/1`)}
                            >
                                {assignIcon(tile.content.description) && (
                                    <img className="level-icon" src={assignIcon(tile.content.description)} alt="" />
                                )}
                                {tile.description ? <span className="after-text">{tile.description}</span> : ''}
                            </div>
                        );
                        globalTileIndex++;

                        return tileElement;
                    })}
                </div>
            ))}
        </>
    );
};

export default Progress;