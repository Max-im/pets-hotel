import { fetchPetsByName } from '@/actions';
import ContentBlock from '@/components/ContentBlock/ContentBlock';
import GuestsStats from '@/components/GuestsStats';
import PetDetails from '@/components/PetDetails';
import PetsList from '@/components/PetsList';
import SearchForm from '@/components/SearchForm';
import Title from '@/components/Title';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'

interface DashboardSearchPageProps {
    searchParams: Promise<{
        q: string;
    }>;
}

export default async function DashboardSearchPage({ searchParams }: DashboardSearchPageProps) {
    const { q } = await searchParams;

    if (!q) {
        redirect('/');
    }

    const petsList = await fetchPetsByName(q);

    return (
        <>
            <div className="flex justify-between items-center text-white py-8">
                <section>
                    <Title>Pet<b>Soft</b> Search:</Title>
                    <p className="text-lg font-bold">&quot;{q}&quot;</p>
                </section>

                <GuestsStats amount={petsList.length} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 grid-rows-[45px_300px_500px] md:grid-rows-[45px_1fr] md:h-[600px]">
                <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
                    <SearchForm value={q} />
                </div>

                <div className="md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1">
                    <ContentBlock>
                        <Suspense fallback={<p>Loading...</p>}>
                            <PetsList pets={petsList} />
                        </Suspense>
                    </ContentBlock>
                </div>

                <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
                    <ContentBlock>
                        <PetDetails />
                    </ContentBlock>
                </div>
            </div>
        </>
    )
}
