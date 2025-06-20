import { z } from 'zod';
import { LevelGroupColourChoice, ContentChoice, Versions } from './Enums'
import { version } from 'react';

const LevelGroupColourChoiceSchema = z.enum(
  [...Object.values(LevelGroupColourChoice)] as [string, ...string[]]
);

const ContentChoiceSchema = z.enum(
  [...Object.values(ContentChoice)] as [string, ...string[]]
);

const VersionsSchema = z.enum(
  [...Object.values(Versions)] as [string, ...string[]]
);


const FlashcardSchema = z.object({
    front: z.string(),
    back: z.string(),
    help: z.string().optional(),
    strength: z.number().default(0)
});

const DeckSchema = z.object({
    title: z.string(),
    flashcards: z.array(FlashcardSchema),
});

const ContentTypeSchema = z.object({
    description: ContentChoiceSchema,
    content: DeckSchema.nullable().default(null),
});

const LevelSchema = z.object({
    completed: z.boolean().default(false),
    stars: z.number().optional(),
    description: z.string().optional(),
    content: ContentTypeSchema,
});

const LevelGroupSchema = z.object({
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

export type Course = z.infer<typeof CourseSchema>;
