export const LevelGroupColourChoice = {
    Red: '--red', 
    Green: '--green',
    Purple: '--purple', 
    Orange: '--orange',
    Yellow: '--yellow',
    Blue: '--blue',
    Grey: '--grey'
};

export const ContentChoice = {
    Flashcard: 'flashcard',
    Reading: 'reading',
    Writing: 'writing',
    Listening: 'listening',
    ComingSoon: 'coming-soon'
} 

export const Versions = {
    pre0_1: 'pre0.1',
    pre0_2: 'pre0.2'
}

export type LevelGroupColourChoice = typeof LevelGroupColourChoice[keyof typeof LevelGroupColourChoice];
export type ContentChoice = typeof ContentChoice[keyof typeof ContentChoice];
export type Versions = typeof Versions[keyof typeof Versions];