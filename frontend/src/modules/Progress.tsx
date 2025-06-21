import { LevelGroupColourChoice, ContentChoice} from './Enums';
import type { LevelGroupColour, Course } from './Types';
import { useNavigate } from 'react-router-dom';

import bookIcon from '../img/icons/icons8-book-100.png';
import flashcardsIcon from '../img/icons/icons8-flashcards-100.png';
import speakerIcon from '../img/icons/icons8-speaker-100.png'
import writingIcon from '../img/icons/icons8-writing-100.png';
import { mapContentType } from '../App';

export interface ProgressProps {
    course: Course;
    colors: LevelGroupColour;
}

const Progress: React.FC<ProgressProps> = ({ course, colors }) => {
    const progress = course.level_groups;
    const navigate = useNavigate();

    const assignColor = (color: LevelGroupColourChoice | undefined) => {
        switch (color) {
            case LevelGroupColourChoice.Red:
                return colors.Red;
            case LevelGroupColourChoice.Green:
                return colors.Green;
            case LevelGroupColourChoice.Purple:
                return colors.Purple;
            case LevelGroupColourChoice.Orange:
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
                                onClick={() => navigate(`/${mapContentType(tile.content)}/${groupIndex + 1}/${tileIndex + 1}?cardId=1`)}
                            >
                                {assignIcon(mapContentType(tile.content)) && (
                                    <img className="level-icon" src={assignIcon(mapContentType(tile.content))} alt="" />
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