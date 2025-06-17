import { z } from 'zod';
import { LevelGroupColourChoice, ContentChoice } from './Enums'

const LevelGroupColourChoiceSchema = z.enum(
  [...Object.values(LevelGroupColourChoice)] as [string, ...string[]]
);

const ContentChoiceSchema = z.enum(
  [...Object.values(ContentChoice)] as [string, ...string[]]
);

const FlashcardSchema = z.object({
    front: z.string(),
    back: z.string(),
    help: z.string().optional(),
});

const DeckSchema = z.object({
    title: z.string(),
    flashcards: z.array(FlashcardSchema),
});

const ContentTypeSchema = z.object({
    description: ContentChoiceSchema,
    content: DeckSchema.nullable(),
});

const LevelSchema = z.object({
    completed: z.boolean().optional(),
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
    level_groups: z.array(LevelGroupSchema),
});

export type Course = z.infer<typeof CourseSchema>;
