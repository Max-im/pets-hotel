import Image from "next/image";
import PetPlaceholder from "@/public/pet-placeholder.png";
import { fetchPets } from "@/actions";

export default async function PetsList() {
  const petsList = await fetchPets();

  return (
    <ul className="bh-white border-b border-black/10">
      {petsList.map((pet) => (
        <li key={pet.id}>
          <button className="flex items-center p-4 gap-3 w-full cursor-pointer h-[70px] text-base hover:bg-black/5 focus:bg-black/5 transition">
            <Image src={pet.photo || PetPlaceholder} alt="Pet Name" width={45} height={45} className="rounded-full object-cover w-[45px] h-[45px]" />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  )
}
