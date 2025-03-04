import { z } from 'zod';

export const createPetSchema = z.object({
    name: z.string().min(3).max(255),
    owner: z.string().min(3).max(255),
    image: z.string().url(),
    age: z.number().int().positive(),
    notifications: z.string().min(3).max(1024),
});