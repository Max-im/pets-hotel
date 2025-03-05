'use client';

import { useActionState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Pet } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormPetState } from "@/actions/pets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createPetSchema, TPetForm } from "@/schema/createPet.schema";

interface PetFormProps {
  actionCb: (formState: FormPetState, formData: FormData) => Promise<FormPetState>;
  btnText: string;
  onSuccess: (pet?: Pet) => void;
  pet?: Pet;
}

export default function PetForm({ actionCb, btnText, onSuccess, pet }: PetFormProps) {
  const {
    register,
    trigger,
    formState: { errors }
  } = useForm<TPetForm>({
    resolver: zodResolver(createPetSchema),
    defaultValues: {
      name: pet?.name || '',
      owner: pet?.ownerName || '',
      age: pet?.age || 0,
      image: pet?.photo || '',
      notifications: pet?.notes || ''
    }
  });

  const onAction = async (formState: FormPetState, formData: FormData) => {
    const result = await trigger();
    if (!result) {
      return {
        errors: {
          _form: ['Please fill all required fields']
        }
      };
    }
    return await actionCb(formState, formData);
  }

  const [formState, action, isPending] = useActionState(onAction, { errors: {} });


  useEffect(() => {
    if (formState.success) {
      onSuccess(formState.pet);
    }
  }, [formState.success]);

  return (
    <form action={action} className="flex flex-col space-y-4">
      <div className="hidden">
        <Input id="id" name="id" defaultValue={pet?.id} type="text" />
      </div>

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
        {formState.errors.name && (
          <p className="text-sm text-red-500">{formState.errors.name.join(", ")}</p>
        )}
      </div>

      <div>
        <Label htmlFor="owner">Owner Name</Label>
        <Input
          id="owner"
          {...register('owner', { required: 'Owner Name is required' })}
        />
        {errors.owner && (
          <p className="text-sm text-red-500">{errors.owner.message}</p>
        )}
        {formState.errors.owner && (
          <p className="text-sm text-red-500">{formState.errors.owner.join(", ")}</p>
        )}
      </div>

      <div>
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          {...register('age', { required: 'Age is required' })}
        />
        {errors.age && (
          <p className="text-sm text-red-500">{errors.age.message}</p>
        )}
        {formState.errors.age && (
          <p className="text-sm text-red-500">{formState.errors.age.join(", ")}</p>
        )}
      </div>

      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          {...register('image', { required: 'Image URL is required' })}
        />
        {errors.image && (
          <p className="text-sm text-red-500">{errors.image.message}</p>
        )}
        {formState.errors.image && (
          <p className="text-sm text-red-500">{formState.errors.image.join(", ")}</p>
        )}
      </div>

      <div>
        <Label htmlFor="notifications">Notifications</Label>
        <Textarea
          id="notifications"
          {...register('notifications', { required: 'Notification is required' })}
        />
        {errors.notifications && (
          <p className="text-sm text-red-500">{errors.notifications.message}</p>
        )}
        {formState.errors.notifications && (
          <p className="text-sm text-red-500">{formState.errors.notifications.join(", ")}</p>
        )}
      </div>

      {formState.errors._form ? (
        <div className="p-2 bg-red-200 border rounded border-red-400">
          {formState.errors._form?.join(", ")}
        </div>
      ) : null}

      {isPending ? (
        <Button className="mt-4 flex" disabled><Loader2 className="animate-spin m-auto" /></Button>
      ) : (
        <Button type="submit" className="mt-4">{btnText}</Button>
      )}
    </form>

  )
}
