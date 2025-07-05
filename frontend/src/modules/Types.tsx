import * as Schema from "./Schema";
import { z } from 'zod';

export type Level = z.infer<typeof Schema.LevelSchema>;

export type LevelGroup = z.infer<typeof Schema.LevelGroupSchema>;

export type Course = z.infer<typeof Schema.CourseSchema>;

export type LevelGroupColour = {
    Red: string;
    Green: string;
    Purple: string;
    Orange: string;
    Yellow: string;
    Blue: string;
};

export type Deck = z.infer<typeof Schema.DeckSchema>;
export type Reading = z.infer<typeof Schema.ReadingSchema>;

export type Clause = z.infer<typeof Schema.ClauseSchema>;
export type Sentence = z.infer<typeof Schema.SentenceSchema>;
export type Flashcard = z.infer<typeof Schema.FlashcardSchema>;
export type FlashcardWithId = z.infer<typeof Schema.FlashcardWithIdSchema>;