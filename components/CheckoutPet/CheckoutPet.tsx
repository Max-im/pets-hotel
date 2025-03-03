import { checkoutPet } from "@/actions";
import { Button } from "../ui/button";

export default function CheckoutPet({ petId }: { petId: string }) {
  return (
    <form action={checkoutPet.bind(null, petId)}>
      <Button variant="secondary" type="submit">
        Checkout
      </Button>
    </form>
  )
}
