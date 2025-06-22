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
    strength: z.number().default(0)
});

export const DeckSchema = z.object({
    title: z.string(),
    flashcards: z.array(FlashcardSchema),
});

export const ClauseSchema = z.object({
    original: z.string(),
    translated: z.string(),
});

export const LevelSchema = z.object({
    completed: z.boolean().default(false),
    stars: z.number().optional(),
    description: z.string().optional(),
    content: z.union([
    DeckSchema,
    ClauseSchema,
    z.null()
  ]),
});

export const LevelGroupSchema = z.object({
    title: z.string(),
    tiles: z.array(LevelSchema),
    color: LevelGroupColourChoiceSchema.optional(),
});

export const CourseSchema = z.object({
    title: z.string(),
    emoji: z.string().optional(),
    version: VersionsSchema,
    level_groups: z.array(LevelGroupSchema),
});
