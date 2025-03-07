'use server';

import bcrypt from "bcryptjs";
import { db } from '@/db';
import { loginSchema } from "@/schema/auth.schema";
import { signIn, signOut } from '@/auth';
import { AuthError } from "next-auth";
import { Prisma } from "@prisma/client";

export interface FormLoginState {
    errors: {
        email?: string[],
        password?: string[],
        _form?: string[],
    },
    redirect?: boolean;
    success?: boolean;
}

export const login = async (formState: FormLoginState, formData: FormData): Promise<FormLoginState> => {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        const defaultError = 'Login error';
        if (error && typeof error === 'object' && 'digest' in error) {
            return {
                errors: {},
                redirect: true,
                success: true
            };
        }
        if (error instanceof AuthError) {
            return {
                errors: { _form: [error.message || defaultError] }
            }
        };

        return {
            errors: { _form: [defaultError] }
        };
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
        confirmPassword?: string[],
        _form?: string[],
    },
    success?: boolean;
}

export const signup = async (formState: FormSignupState, formData: FormData): Promise<FormSignupState> => {
    const result = loginSchema.safeParse({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    try {
        const hashedPassword = await bcrypt.hash(result.data.password, 10);

        await db.user.create({
            data: {
                email: result.data.email,
                hashedPassword

            }
        });
    } catch (err) {
        const defaultError = 'Sign Up error';

        if(err instanceof Prisma.PrismaClientKnownRequestError) {
            if(err.code === 'P2002') {
                return {
                    errors: {
                        _form: ['User already exists']
                    }
                }
            }

        }

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

export async function logOut() {
    return signOut({ redirectTo: '/' });
}