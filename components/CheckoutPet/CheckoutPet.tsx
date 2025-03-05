'use client';

import { useActionState } from "react";
import { checkoutPet } from "@/actions";
import { Button } from "../ui/button";
import { usePetContext } from "@/lib/hooks";
import { toast } from "sonner";

export default function CheckoutPet({ petId }: { petId: string }) {
  const { setSelectedPet } = usePetContext();

  const [formState, action, isPending] = useActionState(
    checkoutPet.bind(null, petId),
    { errors: [] }
  );

  if (formState.success) {
    setSelectedPet(null);
  }

  if (formState.errors.length) {
    toast.error(formState.errors.join(", "));
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
    </div>
  )
}
