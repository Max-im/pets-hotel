'use client';

import { usePetContext } from "@/lib/hooks";
import Image from "next/image";
import EditPet from "@/components/EditPet";
import CheckoutPet from "../CheckoutPet";

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  if (!selectedPet) {
    return (
      <section className="h-full w-full flex justify-center">
        <h2 className="text-xl m-auto leading-7">Please select a pet to view details</h2>
      </section>
    )
  }

  return (
    <section className="h-full w-full flex flex-col">
      <div className="flex bg-white items-center py-4 px-8 border-b border-light">
        <Image src={selectedPet.photo} alt={selectedPet.name} className="rounded-full h-[80px] w-[80px] object-cover" width={80} height={80} />
        <h2 className="text-3xl font-semibold leading-7 ml-5">{selectedPet.name}</h2>
        <div className="flex gap-2 ml-auto">
          <EditPet pet={selectedPet} />
          <CheckoutPet petId={selectedPet.id} />
        </div>
      </div>

      <div className="flex justify-around p-8 text-center">

        <div>
          <h3 className="text-xs uppercase text-zinc-700">Owner Name:</h3>
          <p className="mt-1 text-lg font-semibold text-zinc-800">{selectedPet.ownerName}</p>
        </div>

        <div>
          <h3 className="text-xs uppercase text-zinc-700">Age:</h3>
          <p className="mt-1 text-lg font-semibold text-zinc-800">{selectedPet.age}</p>
        </div>
      </div>

      <div className="text-lg bg-white p-8 rounded-md mb-9 mx-8 flex-1 border border-light"> 
        {selectedPet.notes}
      </div>
    </section>
  )
}
