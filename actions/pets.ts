'use server';

import { Pet } from '@prisma/client';
import { db } from '@/db';

export const fetchPets = async (): Promise<Pet[]> => {
    return await db.pet.findMany({});
} 