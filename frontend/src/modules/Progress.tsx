import type { LevelGroupColourChoice, LevelGroupColour } from '../pages/MainPage'

export interface Level {
    completed: boolean;
    stars: number;
    description?: string;
}

export interface LevelGroup {
    title: string;
    tiles: Level[];
    color: LevelGroupColourChoice | undefined;
}

export interface ProgressProps {
    progress: LevelGroup[];
    colors: LevelGroupColour;
}

const Progress: React.FC<ProgressProps> = ({ progress, colors }) => {
    const totalLevels = progress.reduce((sum, group) => sum + group.tiles.length, 0);

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

    let globalTileIndex = 0;

    return (
        <>
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
                                style={{ background: tile.completed ? '' : 'var(--green)' }}
                            >
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