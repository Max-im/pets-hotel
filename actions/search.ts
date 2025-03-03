'use server';

import { redirect } from "next/navigation";

export async function search(formData: FormData) {
    const search = formData.get('search');

    if (typeof search !== 'string' || !search || !search.trim().length) {
        return redirect(`/app/dashboard`);
    }
    
    return redirect(`/app/dashboard/search?q=${search}`);
}