'use server';

import { Pet } from '@prisma/client';
import { db } from '@/db';

export const fetchPets = async (): Promise<Pet[]> => {
    return await db.pet.findMany({});
} 

export const fetchPetsByName = async (q: string): Promise<Pet[]> => {
    return await db.pet.findMany({
        where: { OR: [
            { name: { contains: q } },
        ]},
    });
} 

export const fetchPetsNum = async (): Promise<number> => {
    return await db.pet.count();
}