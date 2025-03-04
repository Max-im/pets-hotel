'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { editPet } from "@/actions";
import PetForm from "@/components/PetForm";
import { Pet } from "@prisma/client";


export default function EditPet({ pet }: { pet: Pet }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary'>
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Pet</DialogTitle>
        </DialogHeader>
        <DialogDescription>Do you want to edit the pet data?</DialogDescription>

        <PetForm actionCb={editPet} btnText="Edit" onSuccess={() => setOpen(false)} pet={pet} />
      </DialogContent>
    </Dialog>
  )
}
