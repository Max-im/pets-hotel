'use server';

import { revalidatePath } from "next/cache";
import { Pet } from '@prisma/client';
import { db } from '@/db';

export const fetchPets = async (): Promise<Pet[]> => {
    return await db.pet.findMany({});
}

export const fetchPetsByName = async (q: string): Promise<Pet[]> => {
    return await db.pet.findMany({
        where: {
            OR: [
                { name: { contains: q } },
            ]
        },
    });
}

export const fetchPetsNum = async (): Promise<number> => {
    return await db.pet.count();
}

export interface CheckoutPetState {
    errors: string[],
    success?: boolean;
}

export const checkoutPet = async (petId: string) => {
    try {
        await db.pet.delete({ where: { id: petId } });
    } catch (err) {
        const defaultError = 'Checkout pet error';

        if (err instanceof Error) {
            return {
                errors: [err.message || defaultError]
            }
        } else {
            return {
                errors: [defaultError]
            }
        }
    }

    revalidatePath('/app/dashboard');
    return {
        success: true,
        errors: []
    };
}