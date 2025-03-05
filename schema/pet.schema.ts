import { z } from 'zod';

export const createPetSchema = z.object({
    name: z.string().trim().min(3, {message: 'Name is too short'}).max(5, {message: 'Name is too long'}),
    owner: z.string().trim().min(3).max(255),
    image: z.union([
        z.literal(''),
        z.string().trim().url(),
    ]),
    age: z.coerce.number().int().positive().max(30),
    notifications: z.union([
        z.literal(''),
        z.string().trim().min(3).max(1024)
    ]),
}).transform((data) => {
    return {
        ...data,
        image: data.image || 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGV0fGVufDB8fDB8fHww'
    };
});

export type TPetForm = z.infer<typeof createPetSchema>;


export const petIdSchema = z.string().cuid();