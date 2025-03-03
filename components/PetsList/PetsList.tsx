import { fetchPets } from "@/actions";
import PetItem from "@/components/PetItem";

export default async function PetsList() {
  const petsList = await fetchPets();

  return (
    <ul className="bh-white border-b border-black/10">
      {petsList.map((pet) => <PetItem key={pet.id} pet={pet} />)}
    </ul>
  )
}
