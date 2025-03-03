'use server';

import { revalidatePath } from "next/cache";
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

export const checkoutPet = async (petId: string) => {
    await db.pet.delete({
        where: { id: petId }
    });
    
    revalidatePath('/app/dashboard');
}