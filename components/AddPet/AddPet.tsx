'use client';

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { addPet } from "@/actions";
import PetForm from "@/components/PetForm";

export default function AddPet() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='icon' className='absolute bottom-4 right-4'>
          <PlusIcon className="h-6 w-6" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Pet</DialogTitle>
        </DialogHeader>
        <DialogDescription>Do you want to add a pet to your profile?</DialogDescription>
        
        <PetForm actionCb={addPet} btnText="Add Pet" onSuccess={() => setOpen(false)} /> 
      </DialogContent>
    </Dialog>
  )
}
