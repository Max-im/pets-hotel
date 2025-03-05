'use server';

import { db } from '@/db';
import { loginSchema } from "@/schema/auth.schema";

export interface FormLoginState {
    errors: {
        email?: string[],
        password?: string[],
        _form?: string[],
    },
    success?: boolean;
}

export const login = async (formState: FormLoginState, formData: FormData): Promise<FormLoginState> => {
    const result = loginSchema.safeParse({
        name: formData.get('email') as string,
        password: formData.get('password') as string,
    });
    
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    try {
        await db.pet.user({
            data: {
                email: result.data.email,
                password: result.data.password,
            }
        });
    } catch (err) {
        const defaultError = 'Login error';

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

    return {
        success: true,
        errors: {}
    };
}

export interface FormSignupState {
    errors: {
        email?: string[],
        password?: string[],
        _form?: string[],
    },
    success?: boolean;
}

export const signup = async (formState: FormSignupState, formData: FormData): Promise<FormSignupState> => {
    const result = loginSchema.safeParse({
        name: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
    });
    
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    try {
        await db.pet.user.create({
            data: {
                email: result.data.email,
                password: result.data.password,
            }
        });
    } catch (err) {
        const defaultError = 'Sign Up error';

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

    return {
        success: true,
        errors: {}
    };
}
