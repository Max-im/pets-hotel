'use client';

import Image from "next/image";
import { Pet } from "@prisma/client";
import PetPlaceholder from "@/public/pet-placeholder.png";
import { usePetContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export default function PetsItem({ pet }: { pet: Pet }) {
  const { setSelectedPet, selectedPet } = usePetContext();

  const onSelectPet = () => {
    setSelectedPet(pet);
  }

  return (
    <li>
      <button
        onClick={onSelectPet}
        className={cn("flex items-center p-4 gap-3 w-full cursor-pointer h-[70px] text-base hover:bg-black/5 focus:bg-black/5 transition", {'bg-black/5': pet.id === selectedPet?.id})}
      >
        <Image src={pet.photo || PetPlaceholder} alt="Pet Name" width={45} height={45} className="rounded-full object-cover w-[45px] h-[45px]" />
        <p className="font-semibold">{pet.name}</p>
      </button>
    </li>
  )
}
