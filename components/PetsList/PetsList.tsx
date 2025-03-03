import { fetchPets } from "@/actions";
import PetItem from "@/components/PetItem";
import { Pet } from "@prisma/client";

export default async function PetsList({ pets }: { pets?: Pet[] }) {
  const petsList = pets || await fetchPets();

  return (
    <ul className="bh-white border-b border-light">
      {petsList.map((pet) => <PetItem key={pet.id} pet={pet} />)}
    </ul>
  )
}
