'use client';

import { useActionState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Pet } from "@prisma/client";
import { FormPetState } from "@/actions/pets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PetFormProps {
  actionCb: (formState: FormPetState, formData: FormData) => Promise<FormPetState>;
  btnText: string;
  onSuccess: () => void;
  pet?: Pet;
}

export default function PetForm({ actionCb, btnText, onSuccess, pet }: PetFormProps) {
  const [formState, action, isPending] = useActionState(actionCb, { errors: {} });

  useEffect(() => {
    if (formState.success) {
      onSuccess();
    }
  }, [formState.success]);

  return (
    <form action={action} className="flex flex-col space-y-4">
      <div className="hidden">
        <Input id="id" name="id" defaultValue={pet?.id} type="text" />    
      </div>
      
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue={pet?.name} name="name" type="text" placeholder="Name" required className={formState.errors.name ? "border-red-500 focus-visible:ring-red-500" : ""} />
        {formState.errors.name && (
          <p className="text-sm text-red-500">{formState.errors.name.join(", ")}</p>
        )}
      </div>

      <div>
        <Label htmlFor="owner">Owner Name</Label>
        <Input id="owner" name="owner" defaultValue={pet?.ownerName} type="text" placeholder="Owner Name" required className={formState.errors.owner ? "border-red-500 focus-visible:ring-red-500" : ""} />
        {formState.errors.owner && (
          <p className="text-sm text-red-500">{formState.errors.owner.join(", ")}</p>
        )}
      </div>

      <div>
        <Label htmlFor="age">Age</Label>
        <Input id="age" name="age" type="number" defaultValue={pet?.age} placeholder="Age" required className={formState.errors.age ? "border-red-500 focus-visible:ring-red-500" : ""} />
        {formState.errors.age && (
          <p className="text-sm text-red-500">{formState.errors.age.join(", ")}</p>
        )}
      </div>

      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input id="image" name="image" type="text" defaultValue={pet?.photo} placeholder="Image URL" required className={formState.errors.image ? "border-red-500 focus-visible:ring-red-500" : ""} />
        {formState.errors.image && (
          <p className="text-sm text-red-500">{formState.errors.image.join(", ")}</p>
        )}
      </div>

      <div>
        <Label htmlFor="notifications">Notifications</Label>
        <Textarea id="notifications" name="notifications" defaultValue={pet?.notes} placeholder="Notifications" required rows={3} className={formState.errors.notifications ? "border-red-500 focus-visible:ring-red-500" : ""} />
        {formState.errors.notifications && (
          <p className="text-sm text-red-500">{formState.errors.notifications.join(", ")}</p>
        )}
      </div>

      {formState.errors._form ? (
        <div className="absolute top-[100%] p-2 bg-red-200 border rounded border-red-400">
          {formState.errors._form?.join(", ")}
        </div>
      ) : null}

      {isPending ? (
        <>
          <Loader2 className="animate-spin w-4 h-4 mr-2" /> Processing...
        </>
      ) : (
        <Button type="submit" className="mt-4">{btnText}</Button>
      )}
    </form>

  )
}
