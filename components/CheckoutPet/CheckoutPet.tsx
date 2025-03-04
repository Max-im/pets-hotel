'use client';

import { useActionState } from "react";
import { checkoutPet } from "@/actions";
import { Button } from "../ui/button";
import { usePetContext } from "@/lib/hooks";

export default function CheckoutPet({ petId }: { petId: string }) {
  const { setSelectedPet } = usePetContext();

  const [formState, action, isPending] = useActionState(
    checkoutPet.bind(null, petId),
    { errors: [] }
  );

  if (formState.success) {
    setSelectedPet(null);
  }

  if (isPending) {
    return (<Button variant="secondary" disabled>
      Checkout
    </Button>)
  }

  return (
    <div className="relative">
      <form action={action}>
        <Button variant="secondary" type="submit">
          Checkout
        </Button>

      </form>
      
      {formState.errors.length ? (
        <div className="absolute top-[100%] p-2 bg-red-200 border rounded border-red-400">
          {formState.errors?.join(", ")}
        </div>
      ) : null}
    </div>
  )
}
