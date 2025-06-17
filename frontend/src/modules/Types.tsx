import { ContentChoice, LevelGroupColourChoice } from "./Enums";

export type Level = {
    completed?: boolean;
    stars?: number;
    description?: string;
    content: ContentType;
}

export type LevelGroup = {
    title: string;
    tiles: Level[];
    color?: LevelGroupColourChoice;
}

export type Course = {
    title: string;
    emoji?: string;
    level_groups: LevelGroup[];
}

export type LevelGroupColour = {
    Red: string;
    Green: string;
    Purple: string;
    Orange: string;
};

export type ContentType = {
    description: ContentChoice;
    content: Deck | null;
}

export type Deck = {
    title: string;
    flashcards: Flashcard[];
}

export type Flashcard = {
    front: string,
    back: string,
    help?: string,
    strength: number
}