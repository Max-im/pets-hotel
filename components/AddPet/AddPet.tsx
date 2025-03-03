import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function AddPet() {
  return (
    <Button size='icon' className='absolute bottom-4 right-4'>
      <PlusIcon className="h-6 w-6" />
    </Button>
  )
}
