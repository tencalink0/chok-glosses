import type { LevelGroupColourChoice, LevelGroupColour } from '../pages/MainPage'

export interface Level {
    completed: boolean;
    stars: number;
}

export interface LevelGroup {
    tiles: Level[];
    color: LevelGroupColourChoice | undefined;
}

export interface ProgressProps {
    progress: LevelGroup[];
    colors: LevelGroupColour;
}

const Progress: React.FC<ProgressProps> = ({ progress, colors }) => {
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
                    {group.tiles.map((tile, tileIndex) => (
                        <div
                            key={tileIndex}
                            className="level"
                            style={{ background: tile.completed ? '' : ''}}
                        >
                            {tileIndex+1}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default Progress;