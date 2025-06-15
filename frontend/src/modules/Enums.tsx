export const LevelGroupColourChoice = {
    Red: 'red', 
    Green: 'green',
    Purple: 'purple', 
    Orange: 'oranges'
};

export const ContentChoice = {
    Flashcard: 'flashcard',
    Reading: 'reading',
    Writing: 'writing',
    Listening: 'listening',
    ComingSoon: 'coming-soon'
} 

export type LevelGroupColourChoice = typeof LevelGroupColourChoice[keyof typeof LevelGroupColourChoice];
export type ContentChoice = typeof ContentChoice[keyof typeof ContentChoice];