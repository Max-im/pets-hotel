'use client';

import { usePetContext } from "@/lib/hooks";

export default function PetDetails() {
  const {selectedPet} = usePetContext();
  console.log(selectedPet);

  return (
    <section className="h-full w-full">
      
    </section>
  )
}
