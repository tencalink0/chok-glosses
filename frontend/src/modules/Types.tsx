import { LevelGroupColourChoice, Versions } from "./Enums";
import { ClauseSchema } from "./Schema";
import { z } from 'zod';

export type Level = {
    completed?: boolean;
    stars?: number;
    description?: string;
    content: Deck | Clause | null;
}

export type LevelGroup = {
    title: string;
    tiles: Level[];
    color?: LevelGroupColourChoice;
}

export type Course = {
    title: string;
    emoji?: string;
    version: Versions;
    level_groups: LevelGroup[];
}

export type LevelGroupColour = {
    Red: string;
    Green: string;
    Purple: string;
    Orange: string;
};

export type Deck = {
    title: string;
    flashcards: Flashcard[];
}

export type Clause = z.infer<typeof ClauseSchema>;

export type Flashcard = {
    front: string,
    back: string,
    help?: string,
    strength: number
}