import { fetchPetsNum } from "@/actions";

export default async function GuestsStats({amount}: {amount?: number}) {
  const guestsNum = amount || await fetchPetsNum();

  return (
    <section className="text-center">
      <p className="text-2xl leading-6 font-bold">{guestsNum}</p>
      <p className="opacity-80">Current guests</p>
    </section>
  )
}
