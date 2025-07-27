import { z } from 'zod';
import { LevelGroupColourChoice, Versions } from './Enums'

const LevelGroupColourChoiceSchema = z.enum(
    [...Object.values(LevelGroupColourChoice)] as [string, ...string[]]
);

const VersionsSchema = z.enum(
    [...Object.values(Versions)] as [string, ...string[]]
);

export const FlashcardSchema = z.object({
    front: z.string(),
    back: z.string(),
    help: z.string().optional(),
    strength: z.number().default(0.5) // Non-zero default to reward more for first correct
});

export const FlashcardWithIdSchema = FlashcardSchema.extend({
    levelGroupId: z.number(),
    levelId: z.number(),
    id: z.number()
})

export const DeckSchema = z.object({
    title: z.string(),
    flashcards: z.array(FlashcardSchema),
});

export const ClauseSchema = z.object({
    original: z.string(),
    translated: z.string().optional(),
    help: z.string().optional()
});

export const SentenceSchema = z.object({
    clauses: z.array(ClauseSchema),
    completed: z.boolean().default(false)
});

export const ReadingSchema = z.object({
    title: z.string(),
    sentences: z.array(SentenceSchema)
});

export const LevelSchema = z.object({
    completed: z.boolean().default(false),
    stars: z.number().optional(),
    description: z.string().optional(),
    content: z.union([
        DeckSchema,
        ReadingSchema,
        z.null()
    ]),
});

export const LevelGroupSchema = z.object({
    title: z.string(),
    tiles: z.array(LevelSchema),
    color: z.union([
        LevelGroupColourChoiceSchema,
        z.string(),
        z.undefined()
    ])
});

export const CourseSchema = z.object({
    title: z.string(),
    purchaseTitle: z.string().optional(),
    emoji: z.string().optional(),
    version: VersionsSchema,
    level_groups: z.array(LevelGroupSchema),
});
