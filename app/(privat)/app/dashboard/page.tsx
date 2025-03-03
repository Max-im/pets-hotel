import ContentBlock from "@/components/ContentBlock/ContentBlock";
import GuestsStats from "@/components/GuestsStats";
import PetDetails from "@/components/PetDetails";
import PetsList from "@/components/PetsList";
import SearchForm from "@/components/SearchForm";
import Title from "@/components/Title";
import { Suspense } from "react";

export default function AccountPage() {
  return (
    <>
      <div className="flex justify-between items-center text-white py-8">
        <section>
          <Title>Pet<b>Soft</b></Title>
          <p className="text-lg">Welcome to your account page</p>
        </section>

        <GuestsStats />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 grid-rows-[45px_300px_500px] md:grid-rows-[45px_1fr] md:h-[600px]">
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
          <SearchForm />
        </div>

        <div className="md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1">
          <ContentBlock>
            <Suspense fallback={<p>Loading...</p>}>
              <PetsList />
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
