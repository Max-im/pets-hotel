'use server';

import { revalidatePath } from "next/cache";
import { Pet } from '@prisma/client';
import { db } from '@/db';
import { createPetSchema, petIdSchema } from "@/schema/createPet.schema";

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
    const idResult = petIdSchema.safeParse(petId);
    if (!idResult.success) {
        return {
            errors: ['Invalid pet ID']
        };
    }
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

export interface FormPetState {
    errors: {
        name?: string[],
        owner?: string[],
        age?: string[],
        image?: string[],
        notifications?: string[],
        _form?: string[],
    },
    success?: boolean;
    pet?: Pet;
}

export const addPet = async (formState: FormPetState, formData: FormData): Promise<FormPetState> => {
    const result = createPetSchema.safeParse({
        name: formData.get('name') as string,
        owner: formData.get('owner') as string,
        age: parseInt(formData.get('age') as string),
        image: formData.get('image') as string,
        notifications: formData.get('notifications') as string,
    });
    
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    try {
        await db.pet.create({
            data: {
                name: result.data.name,
                ownerName: result.data.owner,
                age: result.data.age,
                photo: result.data.image,
                notes: result.data.notifications,
            }
        });
    } catch (err) {
        const defaultError = 'Add pet error';

        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message || defaultError]
                }
            }
        } else {
            return {
                errors: {
                    _form: [defaultError]
                }
            }
        }
    }

    revalidatePath('/app/dashboard');

    return {
        success: true,
        errors: {}
    };
}

export const editPet = async (formState: FormPetState, formData: FormData): Promise<FormPetState> => {
    const result = createPetSchema.safeParse({
        name: formData.get('name') as string,
        owner: formData.get('owner') as string,
        age: parseInt(formData.get('age') as string),
        image: formData.get('image') as string,
        notifications: formData.get('notifications') as string,
    });

    
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const idResult = petIdSchema.safeParse(formData.get('id') as string);
    if (!idResult.success) {
        return {
            errors: {
                _form: ['Invalid pet ID']
            },
        };
    }

    let pet;
    try {
        pet = await db.pet.update({
            where: { id: idResult.data },
            data: {
                name: result.data.name,
                ownerName: result.data.owner,
                age: result.data.age,
                photo: result.data.image,
                notes: result.data.notifications,
            }
        });
    } catch (err) {
        const defaultError = 'Edit pet error';

        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message || defaultError]
                }
            }
        } else {
            return {
                errors: {
                    _form: [defaultError]
                }
            }
        }
    }

    revalidatePath('/app/dashboard');

    return {
        success: true,
        errors: {},
        pet
    };
}